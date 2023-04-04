import React, { useState } from "react";
import loran from "../assets/images/loran.jpeg";

const About = () => {
  return (
    <div className="lg:max-w-4xl mx-auto my-8 pb-8">
      <h1 className='text-3xl font-light tracking-wider mb-6 pt-10'>About</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-5">
        <div className="col-span-1">
          <img src={loran} alt="picture of Loran Scruggs" />
          <figcaption className="text-neutral-400 text-sm">
            Many thanks to Gale and her photography.{" "}
            <a
              href="https://www.gzucker.com"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              https://www.gzucker.com
            </a>
          </figcaption>
        </div>
        <div className="col-span-1 italic text-neutral-700 text-sm">
          <p>
            I've been working with tin cans and bottle caps since 1991. I love
            the colors, fonts and pictures found on painted tin cans and bottle
            caps. I've found most of my materials over the years, off the
            streets of large cities, garage sales and kind people.
          </p>
          <br />
          <p>
            I love giving items a new life liberating the recyclable to a place
            of value once more.
          </p>
          <br />
          <p>
            I am interested in joy. Color is joyous for me so I use painted tin
            cans for their color and glint. A lot of my work reference childhood
            and play, for myself play is a time of being in the moment, no past
            regrets or future worries, a time of joy.
          </p>
          <br />
          <p>
            I usually start with an object or image. For example I ponder Hunt’s
            tomato cans...tin cans are sharp…I cut myself... Hunt’s..red… hunt
            cut sharp.. Oee I know I’ll make a Hunting Knife out of Hunt’s
            tomato cans. I hope that my work puts an amused smile on your face,
            for when we smile we are in the moment, engaged, attentive and
            happy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
