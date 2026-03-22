import express from "express";

const app = express();
const port = parseInt(process.env.APP_PORT || "3000", 10);

app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Onboarding App</title>
    <style>
      :root {
        color-scheme: light dark;
      }

      body {
        margin: 0;
        font-family: Arial, sans-serif;
        transition: background-color 0.2s ease, color 0.2s ease;
      }

      body.light {
        background-color: #f8fafc;
        color: #111827;
      }

      body.dark {
        background-color: #111827;
        color: #f3f4f6;
      }

      .container {
        max-width: 720px;
        margin: 48px auto;
        padding: 0 16px;
      }

      .card {
        border-radius: 12px;
        padding: 20px;
        border: 1px solid;
      }

      body.light .card {
        background: #ffffff;
        border-color: #d1d5db;
      }

      body.dark .card {
        background: #1f2937;
        border-color: #374151;
      }

      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

      button {
        border: 0;
        border-radius: 8px;
        padding: 10px 14px;
        font-size: 14px;
        cursor: pointer;
      }

      body.light button {
        background: #111827;
        color: #f9fafb;
      }

      body.dark button {
        background: #e5e7eb;
        color: #111827;
      }

      .muted {
        opacity: 0.8;
      }
    </style>
  </head>
  <body>
    <main class="container">
      <section class="card">
        <div class="top">
          <h1>Onboarding Demo</h1>
          <button id="theme-toggle" type="button">Toggle theme</button>
        </div>
        <p class="muted">This page demonstrates light/dark mode persistence.</p>
        <p id="hello-message">Loading greeting...</p>
      </section>
    </main>

    <script>
      (function () {
        var STORAGE_KEY = "theme-preference";
        var body = document.body;
        var toggleButton = document.getElementById("theme-toggle");
        var helloMessage = document.getElementById("hello-message");

        function applyTheme(theme) {
          var nextTheme = theme === "dark" ? "dark" : "light";
          body.classList.remove("light", "dark");
          body.classList.add(nextTheme);
          localStorage.setItem(STORAGE_KEY, nextTheme);
        }

        var savedTheme = localStorage.getItem(STORAGE_KEY);
        applyTheme(savedTheme || "light");

        toggleButton.addEventListener("click", function () {
          var isDark = body.classList.contains("dark");
          applyTheme(isDark ? "light" : "dark");
        });

        fetch("/hello?name=World")
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            helloMessage.textContent = data.message;
          })
          .catch(function () {
            helloMessage.textContent = "Could not load greeting.";
          });
      })();
    </script>
  </body>
</html>`);
});

app.get("/hello", (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name : "World";
  res.json({ message: `Hello, ${name}!` });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Onboarding app listening on port ${port}`);
});
