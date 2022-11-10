import React, { useState, useRef } from "react";
import ReRegExp from "reregexp";
export function Home() {
  const re = /[A-Z0-9]{6}/;
  const regex = new RegExp(re);
  const gen = new ReRegExp(re);
  const [code, setCode] = useState(gen.build());
  const ref = useRef<HTMLTextAreaElement>(null);

  function onBlurHandler() {
    if (!ref.current) {
      return;
    }
    if (!regex.test(ref.current.value)) {
      setCode(gen.build());
    }
  }

  function onChangeHandler() {
    if (!ref.current) {
      return;
    }
    setCode(ref.current.value);
  }

  function randomCodeOnClickHandler() {
    setCode(gen.build());
  }

  return (
    <div className="flex h-screen items-center justify-center bg-violet-800">
      <div className="grid grid-cols-3 rounded-lg bg-slate-700/25 w-1/2 h-2/3">
        <div className="col-span-2 border border-black justify-center grid grid-cols-2 gap-y-2 h-full">
          <div className="col-span-2 text-center h-1/4">Fish Shrimp Crab</div>
          <div className="col-span-2 h-2/3 text-center">
            <label
              htmlFor="code"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Room Code
            </label>
            <div className="flex flex-row h-2/3 items-center">
              <textarea
                id="code"
                ref={ref}
                maxLength={6}
                rows={1}
                value={code}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                className="font-sans font-semibold h-1/2 overflow-hidden resize-none basis-1/3 ml-auto text-4xl text-center text-gray-300 bg-slate-300/25 rounded-lg border border-gray-300/60"
              ></textarea>
              <button
                className="basis-1/12 bg-slate-300/25 mr-auto h-1/2 mx-2 rounded-lg border border-gray-300/60"
                onClick={randomCodeOnClickHandler}
              >
                R
              </button>
            </div>
          </div>
          <div className="col-span-1 h-1/4">
            <button className="bg-blue-500"> Create Room</button>
          </div>
          <div className="col-span-1 h-1/4"></div>
        </div>
      </div>
      <div className="border border-black">Home</div>
    </div>
  );
}
