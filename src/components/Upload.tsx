import { ChangeEvent, useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { parse } from "csv-parse/browser/esm/sync";
import { csvItem } from "../interfaces/interfaces";
import galleryAPI from "../utils/axios";
import categoryNameToId from "../utils/categoryNameToId";

const columns = [
  "category",
  "location",
  "Inventory No#",
  "Lorans internal description",
  "title",
  "tags",
  "date_created",
  "hours",
  "price",
  "old_price",
  "width",
  "height",
  "depth",
  "Area",
  "Recommended Price $2 x Sq Inch",
  "sold",
  "sold_date",
  "sold_location",
  "history",
  "notes",
  "description",
  "link_url",
  "link_text",
  "web",
  "web_sort",
  "mdk",
  "image",
];

const headers: GridColDef[] = columns.map((column) => {
  return { field: column, headerName: column };
});

export default function Upload(props: any) {
  const [csvData, setCsvData] = useState<csvItem[]>([]);
  const [filename, setFilename] = useState("");
  const [tagIds, setTagIds] = useState<{}>();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      const { name } = file;
      setFilename(name);

      const reader = new FileReader();
      reader.onload = (evt) => {
        if (!evt?.target?.result) {
          return;
        }
        const { result } = evt.target;
        const records = parse(result as string, {
          columns: columns,
          delimiter: ",",
          trim: true,
          skip_empty_lines: true,
          from_line: 2,
          // encoding: "ascii",
          // escape: false,
          relax_quotes: true,
        });
        setCsvData(records);
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.log(error);
    }
  };

  const resync = async () => {
    try {
      if (window.confirm("Are you sure you want to re-sync the database?")) {
        const clean = sanitize(csvData);
        if (!checkMdks(clean)) {
          return alert("One or more MDKs is not unique!");
        }
        const res = await galleryAPI.post("/api/art/seed", {
          seeds: clean,
        });
        if (res.status === 200) {
          props.info("Seeded successful");
          createTags(clean);
        } else {
          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sanitize = (artData: any) => {
    const filtered = artData.filter(
      (art: any) => art.web.toLowerCase() === "x"
    );
    const clean = filtered.map((art: any) => {
      const newArt = {
        ...art,
        categoryId: categoryNameToId(art.category),
      };
      newArt.mdk = parseInt(newArt.mdk) || 0;
      newArt.title = newArt.title.replace("Ã©", "é")
      newArt.description = newArt.description.replaceAll("Ã©", "é")
      if (newArt.mdk === 701) {
        newArt.description = newArt.description.replaceAll("\\n", "n")
        console.log(newArt)
      }
      newArt.web = newArt.web.toLowerCase() === "x" ? true : false;
      newArt.sold = newArt.sold.toLowerCase() === "x" ? true : false;
      const intPrice = parseInt(newArt.price.replace(",", "").substring(1));
      newArt.price = intPrice || null;
      const intOldPrice = parseInt(newArt["old_price"].replace(",", "").substring(1));
      newArt.old_price = intOldPrice || null;
      newArt.hours = parseInt(newArt.hours) || null;
      newArt.web_sort = parseInt(newArt.web_sort) || null;
      return newArt;
    });
    return clean;
  };

  const checkMdks = (artData: any[]) => {
    const old: number[] = [];
    for (const art of artData) {
      if (old.includes(art.mdk)) {
        return false;
      } else {
        old.push(art.mdk);
      }
    }
    return true;
  };

  const createTags = async (artData: any[]) => {
    const allTags = new Set();
    const tagMdks = [];
    for (const art of artData) {
      const tags = art.tags.split(",").map((tag: string) => {
        const trimmed = tag.trim();
        const newTag = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        return newTag;
      });
      if (tags[0].length > 0) {
        for (const tag of tags) {
          if (tag.length > 0) {
            allTags.add(tag);
            tagMdks.push({ mdk: art.mdk, tagName: tag });
          }
        }
      }
    }
    const tagArray: { name: string }[] = Array.from(allTags).map((tag: any) => {
      return { name: tag };
    });
    const res = await galleryAPI.post("/api/tags/seed", {
      tags: tagArray,
    });
    let ids: any = {};
    for (const tag of res.data) {
      ids[tag.name] = tag.id;
    }
    const tagIdMdks = tagMdks.map((x: any) => {
      return {
        artMdk: x.mdk,
        tagId: ids[x.tagName],
      };
    });
    addArtTags(tagIdMdks);
  };

  const addArtTags = async (tagIds: { artMdk: number; tagId: number }[]) => {
    try {
      const res = await galleryAPI.post("/api/art/tags/seed", {
        seeds: tagIds,
      });
      if (res.status === 200) {
        // window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl">Sync art with CSV file</h2>
      <div className="my-3">
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
        >
          Upload CSV
          <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
        </Button>
      </div>
      <h4 className="text-lg">Data preview:</h4>
      <h3 className="italic text-md">{filename}</h3>
      <DataGrid
        className="max-h-80"
        rows={csvData}
        columns={headers}
        sx={{ mt: 1, bgcolor: "white" }}
        getRowId={(row) => row["mdk"]}
        // paginationModel={{page:7,pageSize: 100}}
      />
      <button
        className={
          "p-3 text-white bg-red-500 rounded mt-3" +
          (csvData.length > 0 ? " hover:bg-red-700" : " opacity-40")
        }
        disabled={csvData.length > 0 ? false : true}
        onClick={resync}
      >
        RESYNC
      </button>
    </div>
  );
}
