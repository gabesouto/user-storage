'use client'

import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'

export default function Header() {
  const { push } = useRouter()

  const logout = () => {
    localStorage.clear()
    destroyCookie(undefined, 'token')
    push('/')
  }

  return (
    <nav className="border-black bg-white  rounded-e-sm shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-purpleGuru">
            User Storage
          </span>
        </a>

        <svg
          width="264px"
          height="48px"
          className="w-40 self-center"
          viewBox="0 0 176 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1630_13278)">
            <path
              d="M13.9915 15.4143C14.4507 15.4143 14.8905 15.5184 15.2958 15.7094C17.3827 13.6946 19.3553 11.3762 20.4936 9.09597C19.8145 8.29344 18.48 7.37626 18.0014 7.00684C14.5089 11.1702 7.7266 17.4674 1.24609 22.5713C1.62552 23.9131 2.30462 24.8813 3.49465 25.6477C3.49465 25.6477 6.00407 24.9641 7.72229 23.8579C8.58033 23.3038 9.58927 22.5925 10.581 21.6372C10.4085 21.1127 10.3115 20.5416 10.3115 19.9408C10.3115 17.444 11.9629 15.4122 13.9915 15.4122V15.4143Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M16.8717 5.95608C16.2961 5.68432 15.6752 5.56543 15.0242 5.56543C12.8726 5.56543 10.4322 6.87326 8.45527 8.2554C6.22396 9.81164 1.00031 13.4613 0.122879 17.147C-0.146604 18.2765 0.0237091 19.5779 0.61657 21.0089C6.51069 15.9962 14.4615 8.91144 16.8717 5.95608Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M27.778 17.147C27.2951 15.1152 25.4863 13.1025 23.5956 11.4316C22.964 10.8733 21.7933 10.1387 21.7933 10.1387C21.7933 10.1387 21.1056 11.3425 20.4459 12.2554C19.409 13.6864 19.1309 14.0813 19.1309 14.0813C19.1309 14.0813 20.4869 15.1407 20.7478 15.3742C23.0524 17.4315 25.5747 19.5589 27.2843 21.0132C27.8772 19.5801 28.0475 18.2808 27.778 17.1513V17.147Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M16.6323 16.8539C17.3071 17.6267 17.6714 18.7859 17.6714 19.9409C17.6714 20.5629 17.568 21.1574 17.3826 21.6988C18.3527 22.6245 19.3379 23.3166 20.1766 23.858C21.8948 24.9641 24.4042 25.6478 24.4042 25.6478C25.5942 24.8813 26.2733 23.9132 26.6528 22.5714C24.9841 21.2572 23.0115 19.5566 21.1424 17.943C20.1593 17.0959 18.0767 15.3125 18.0767 15.3125C18.0767 15.3125 17.9366 15.5206 17.5443 15.9282C17.2834 16.2 16.9773 16.5036 16.6323 16.8518V16.8539Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M15.701 18.2935C15.3237 17.5164 14.6921 16.9941 13.9914 16.9941C13.9634 16.9941 13.9375 16.9941 13.9116 16.9963C12.8229 17.0578 11.9175 18.3805 11.9175 19.941C11.9175 20.0047 11.9175 20.0663 11.9218 20.13C11.9929 21.6437 12.9113 22.89 13.9936 22.89C15.0758 22.89 15.9468 21.7096 16.0567 20.2489C16.0654 20.1491 16.0675 20.0472 16.0675 19.9431C16.0675 19.338 15.9317 18.7691 15.701 18.2956V18.2935Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M40.2153 7.49354H43.6604L43.807 9.98394C44.3201 9.02218 45.066 8.27484 46.0426 7.74619C47.0192 7.21754 48.1446 6.95215 49.4144 6.95215C52.0532 6.95215 53.8123 8.05829 54.6919 10.2727C55.2546 9.21326 56.0544 8.39586 57.0936 7.81838C58.1327 7.24089 59.3464 6.95215 60.7413 6.95215C62.7699 6.95215 64.3459 7.5721 65.4691 8.80987C66.5923 10.0498 67.1549 11.7992 67.1549 14.0603V24.2746H63.4533V14.4934C63.4533 13.0731 63.1537 11.9966 62.5543 11.2642C61.955 10.5296 61.0948 10.1644 59.9716 10.1644C58.6285 10.1644 57.5592 10.657 56.7637 11.6442C55.9703 12.6315 55.5737 13.9541 55.5737 15.6144V24.2767H51.8721V14.4955C51.8721 11.6081 50.6863 10.1644 48.3171 10.1644C46.974 10.1644 45.9046 10.657 45.1091 11.6442C44.3158 12.6315 43.9169 13.9541 43.9169 15.6144V24.2767H40.2153V7.49354Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M68.8755 15.9032C68.8755 14.1707 69.242 12.6315 69.975 11.2833C70.708 9.93511 71.7147 8.8778 72.9996 8.10712C74.2824 7.33643 75.7548 6.95215 77.4148 6.95215C79.0749 6.95215 80.5732 7.3428 81.83 8.1241C83.0891 8.90541 84.0721 10.0009 84.7793 11.4085C85.4885 12.8162 85.8421 14.4467 85.8421 16.3002V16.9859H72.5749C72.7215 18.453 73.2907 19.608 74.2802 20.4509C75.2698 21.2937 76.5827 21.7141 78.2211 21.7141C80.2002 21.7141 81.9723 21.0411 83.5353 19.6929L85.3678 21.9667C84.4882 22.8563 83.4017 23.5485 82.106 24.041C80.8103 24.5336 79.4435 24.782 78.0012 24.782C76.1925 24.782 74.6058 24.4083 73.2368 23.6631C71.8678 22.9179 70.7985 21.8755 70.0289 20.54C69.2592 19.2046 68.8755 17.659 68.8755 15.901V15.9032ZM80.7306 11.2472C79.9113 10.4765 78.842 10.0922 77.5226 10.0922C76.2032 10.0922 75.0305 10.4829 74.1509 11.2642C73.2713 12.0455 72.7453 13.0985 72.5749 14.4234H82.1771C82.0305 13.0752 81.5476 12.0179 80.7306 11.2472Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M88.1161 17.7074V7.49316H91.8177V17.2021C91.8177 18.6225 92.1303 19.7116 92.7512 20.4696C93.3743 21.2275 94.2603 21.6054 95.4094 21.6054C96.8258 21.6054 97.9555 21.0832 98.7984 20.0365C99.6413 18.9898 100.062 17.5991 100.062 15.8667V7.49316H103.763V24.2763H100.355L100.208 21.7137C99.6219 22.6755 98.8221 23.4292 97.8067 23.9685C96.7935 24.5099 95.6509 24.7816 94.3789 24.7816C92.4235 24.7816 90.8907 24.1617 89.7805 22.9239C88.668 21.684 88.1118 19.9452 88.1118 17.7074H88.1161Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M123.117 24.0961V22.0388C121.944 23.6757 120.148 24.4931 117.729 24.4931C116.19 24.4931 114.841 24.1449 113.679 23.4464C112.519 22.7479 111.613 21.7734 110.966 20.5229C110.32 19.2724 109.994 17.8159 109.994 16.1556C109.994 14.2788 110.41 12.6546 111.24 11.2831C112.07 9.91159 113.239 8.84791 114.741 8.08996C116.244 7.33201 118.01 6.9541 120.036 6.9541C121.136 6.9541 122.285 7.05601 123.481 7.25983C124.678 7.46365 125.766 7.75876 126.743 8.14516V23.9538C126.743 26.5291 125.986 28.5142 124.471 29.9091C122.955 31.304 120.782 32.0025 117.947 32.0025C115.112 32.0025 112.803 31.2934 110.947 29.873L112.56 27.2022C114.196 28.3571 115.968 28.9346 117.874 28.9346C121.368 28.9346 123.115 27.3232 123.115 24.0982L123.117 24.0961ZM123.044 16.6248V10.5252C121.994 10.2598 121.015 10.1281 120.112 10.1281C118.109 10.1281 116.55 10.6504 115.44 11.6971C114.327 12.7438 113.773 14.1939 113.773 16.0474C113.773 17.6588 114.2 18.9518 115.056 19.9263C115.912 20.9008 117.048 21.3891 118.465 21.3891C119.881 21.3891 120.937 20.9432 121.78 20.0537C122.623 19.1641 123.046 18.0197 123.046 16.6248H123.044Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M129.237 17.7074V7.49316H132.939V17.2021C132.939 18.6225 133.251 19.7116 133.872 20.4696C134.495 21.2275 135.381 21.6054 136.53 21.6054C137.947 21.6054 139.077 21.0832 139.919 20.0365C140.762 18.9898 141.183 17.5991 141.183 15.8667V7.49316H144.884V24.2763H141.476L141.329 21.7137C140.743 22.6755 139.943 23.4292 138.928 23.9685C137.915 24.5099 136.772 24.7816 135.5 24.7816C133.545 24.7816 132.012 24.1617 130.902 22.9239C129.789 21.684 129.233 19.9452 129.233 17.7074H129.237Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M147.452 7.49382H150.897L151.08 10.2369C151.667 9.27511 152.43 8.52777 153.37 7.99912C154.31 7.47047 155.355 7.20508 156.502 7.20508C157.138 7.20508 157.772 7.30062 158.408 7.49382L157.712 10.8144C157.198 10.6466 156.662 10.5617 156.099 10.5617C154.683 10.5617 153.503 11.0182 152.563 11.9332C151.623 12.8483 151.151 14.05 151.151 15.5425V24.277H147.45V7.49382H147.452Z"
              fill="#7a00c6"
            ></path>
            <path
              d="M160.35 17.7074V7.49316H164.052V17.2021C164.052 18.6225 164.365 19.7116 164.986 20.4696C165.609 21.2275 166.495 21.6054 167.644 21.6054C169.06 21.6054 170.19 21.0832 171.033 20.0365C171.876 18.9898 172.296 17.5991 172.296 15.8667V7.49316H175.998V24.2763H172.589L172.443 21.7137C171.856 22.6755 171.056 23.4292 170.041 23.9685C169.028 24.5099 167.885 24.7816 166.613 24.7816C164.658 24.7816 163.125 24.1617 162.015 22.9239C160.902 21.684 160.346 19.9452 160.346 17.7074H160.35Z"
              fill="#7a00c6"
            ></path>
          </g>
        </svg>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-purpleGuru dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <a
                href="https://github.com/gabesouto/user-storage"
                className="block py-2 px-3 md:p-0 text-purpleGuru rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-purpleGuru md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Repository
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={logout}
                className="block py-2 px-3 md:p-0 text-purpleGuru rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-purpleGuru md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
