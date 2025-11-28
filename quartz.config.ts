import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

// ➡️ 1. Obtener la variable de entorno de Node.js
// process.env.GITHUB_REPOSITORY es común en entornos de GitHub Actions
const GITHUB_REPO = process.env.GITHUB_REPOSITORY
const BASE_PATH = GITHUB_REPO ? `/${GITHUB_REPO.split("/")[1]}` : "" // Extrae solo el nombre del repositorio

// ➡️ 2. Definir la URL base condicionalmente
// Si estamos en GH Actions, usamos la URL completa. Si estamos en local, usamos localhost.
const getBaseUrl = () => {
  // Comprobar si estamos ejecutando en un entorno de GitHub Pages
  if (process.env.GITHUB_PAGES === "true" && process.env.GITHUB_ACTIONS === "true") {
    // URL de producción (cambia "eldelapanaderia.github.io" por tu nombre real)
    return `https://${process.env.GITHUB_ACTOR}.github.io${BASE_PATH}`
  }

  // URL para desarrollo local
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8080"
  }

  // URL por defecto (para el caso que tengas un CNAME, o usa tu URL de producción)
  return "eldelapanaderia.github.io/Quartz-Worlbuilding"
}

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Firmamento",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: getBaseUrl(),
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
