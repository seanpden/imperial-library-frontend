/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require("@catppuccin/tailwindcss")({
      // prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
      // default is `ctp`
      prefix: false,
      // which flavour of colours to use by default, in the `:root`
      defaultFlavour: "frappe",
    }),
  ],
}

