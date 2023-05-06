import React from "react";
import ArtistCard from "../components/ArtistCard";

const Links = () => {

  const artists = [
    {
      name: "Jenny Fillius",
      description: "Jenny is a great artist who creates wondrous works in Tin, as well as staying in touch with a large collection of Tin workers. I stole this list of Tin artists from her. Many thanks Jenny.",
      link: "https://jennyfillius.net/home.html/"
    },
    {
      name: "Robert Villamagna",
      description: "West Virgina based artist Robert Villamagna creates large scale recycled tin artworks that are inventive and witty.",
      link: "http://www.robertvillamagna.com/"
    },
    {
      name: "Harriette Estel Bermann",
      description: "Harriete is the Queen of tin jewelery and other amazingly clever, detailed and well crafted tin artwork. She also has a blog where you can learn practical advice on the business of art. Link is on her site.",
      link: "http://www.harriete-estel-berman.info/"
    },
    {
      name: "Ross Palmer Beecher",
      description: "Ross Palmer Beecher, one of my all time favorite metalsmiths, has great web presence but no website of her own. The link is to a video that captures, her work, studio and her essence. She is represented by Greg Kucera in Seattle.",
      link: "https://www.youtube.com/watch?v=v8qw43TYtWY"
    },
    {
      name: "Kathy Ross",
      description: "Okay just go to Kathy's site and check out her work. I'm not even going to try and explain it, you've just got to see it for yourself. Be sure to watch her video.",
      link: "http://www.kathyross3d.com/"
    },
    {
      name: "Ladybug Circus",
      description: "Check out Dave Yoas' awesome tin work by clicking on his name on the right side of the home page on Ladybug Circus. Also see a small handful of some tinsmiths who don't have their own websites.",
      link: "http://ladybugcircus.typepad.com/blog/tin_artists/"
    },
    {
      name: "David Wasserman",
      description: "Mr. Wasserman died on October 12, 1999 but his work lives on through the internet. His work is wonderful and inspiring.",
      link: "http://www.tincanman.net/tinart.html"
    },
    {
      name: "Bobby Hanson",
      description: "The Fine Art of the Tin Can: Techniques and Inspirations by Bobby Hanson. Bobby's book is a great book for the beginner.",
      link: "http://www.amazon.com/s/?ie=UTF8&keywords=bobby+hansson&tag=googhydr-20&index=stripbooks&hvadid=35231627401&hvpos=1t1&hvexid=&hvnetw=g&hvrand=11944397636502719937&hvpone=&hvptwo=&hvqmt=b&hvdev=c&ref=pd_sl_5o8x26gtth_b"
    },
    {
      name: "Jeri Moe",
      description: "Southwest tinsmith Jeri Moe creates 3D tin works of art that are well thought out and highly desireable",
      link: "http://sanangelfolkart.com/jerimoe/index.htm"
    },
    {
      name: "Burnt Offerings",
      description: "Brunt Offerings is the website for Opie & Linda O'Brien who create all sorts of fun and lively artwork with tin and other found objects. They also teach and have published books on the subjects of their talents. Their site has a wealth of information about who they are.",
      link: "http://www.burntofferings.com/TinMetalCollage/index.html"
    },
    {
      name: "Chris Griffin",
      description: "Chris is a self described mixed media artist. Check out this cool video and see her work and oh so very excellent tin collection. Chris is represented by Snyderman-Works Gallery http://www.snyderman-works.com/artists/93",
      link: "http://www.opb.org/television/video/mixed-media-artist-chris-giffin/"
    },
    {
      name: "Nia Michaels",
      description: "Nia works primarily with vintage tin and tin types. Each artwork is like a treasured jewel.",
      link: "http://niamichaels.com/home.html"
    },
    {
      name: "Deborah Paul",
      description: "Deborah is a fearless artist, always pushing her tin work a little further and trying new ways to represent the material while incorporating other recyclables into her work.",
      link: "http://deborahpaulart.com/portrait.html"
    },
    {
      name: "Mimi Cahalan",
      description: "Mimi Cahalan creates wall-mounted and 3d constructions in painted metal and wood, working in both small and large-scale artwork for interior and exterior spaces.",
      link: "http://www.mimicahalan.com/index.html"
    },
    {
      name: "William Herberholz",
      description: "Bill doesn't have a website but there is a You Tube of him in his studio and you can see his work there. Bill was my teacher and his work is marvelous.",
      link: "https://www.youtube.com/watch?v=XTGrM9b_4aI"
    },
    {
      name: "Tony Berlant",
      description: "No list would be complete without Tony Berlant. He may very well have been nailing tin to wood longer than any of us. There is no way for me to describe his work. Also see more of his work here at Design Faith (http://designfaith.blogspot.com/2010/08/tony-berlant.html), Kenneth Caldwell's insightful blog.",
      link: "http://www.artnet.com/artists/tony-berlant/"
    },
    {
      name: "David Buckingham",
      description: "David's artwork has an LA kind of esthetic, it's clean and bold and in your face, in a good way",
      link: "http://www.buckinghamstudio.com/portfolio-categories/color-studies/"
    },
    {
      name: "Rand Carlson",
      description: "Rand has been around for years. His work is bold and colorful, and he plays a lot with words, cutting out letters from car name pieces. I like his landscapes the best.",
      link: "http://www.randomshots.com/tin/LargerPieces.html"
    },
  ]

  return (
    <div className="lg:max-w-5xl mx-auto my-8 pb-8">
      <h1 className='text-3xl font-light tracking-wider mb-6 pt-10'>Other Tin Artists</h1>
      <div className="">
        {artists.map((artist, index) => <ArtistCard artist={artist} key={index}/>)}
      </div>
    </div>
  );
};

export default Links;
