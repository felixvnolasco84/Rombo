import React from "react"

export default function loading() {
  return (
    <section className="grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex h-full max-w-[1920px] items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="#F8F8F8"
            stroke="#333333"
            stroke-width="2"
          >
            <animate
              attributeName="r"
              from="50"
              to="45"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill"
              values="#F8F8F8; #CCCCCC; #F8F8F8"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="100" cy="50" r="5" fill="#333333">
            <animate
              attributeName="cy"
              from="50"
              to="150"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill"
              values="#333333; #CCCCCC; #333333"
              dur="4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="70" cy="70" r="7" fill="#333333">
            <animate
              attributeName="cx"
              from="70"
              to="130"
              dur="2.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill"
              values="#333333; #CCCCCC; #333333"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="130" cy="130" r="9" fill="#333333">
            <animate
              attributeName="cx"
              from="130"
              to="70"
              dur="2.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill"
              values="#333333; #CCCCCC; #333333"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </section>
  )
}
