"use client";

import { BibleNavigator, useVersion } from "@repo/ui";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <BibleNavigator />
      <HomeContent />
    </>
  );
}

function HomeContent() {
  const { version, loading, error } = useVersion(206);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Bible SDK Demo</h1>

        <div style={{ padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h2>Version 206 Information</h2>

          {loading && <p>Loading version data...</p>}

          {error && (
            <div style={{ color: "red" }}>
              <p>Error: {error.message}</p>
            </div>
          )}

          {version && (
            <div>
              <h3>{version.title}</h3>
              <p><strong>Abbreviation:</strong> {version.abbreviation}</p>
              <p><strong>Local Title:</strong> {version.local_title}</p>
              <p><strong>Language:</strong> {version.language.name} ({version.language.iso_639_3})</p>
              <p><strong>Info:</strong> {version.info}</p>
              <p><strong>Copyright:</strong> {version.copyright}</p>
              {version.info_url && (
                <p><strong>More Info:</strong> <a href={version.info_url} target="_blank" rel="noopener">Link</a></p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
