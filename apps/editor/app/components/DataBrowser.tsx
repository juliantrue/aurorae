"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Entry = { name: string; type: "dir" | "file" };
type DirListing = { base: string; entries: Entry[] };

export function DataBrowser({ initialPath = ["example_rite"] as string[] }) {
  const router = useRouter();
  const [path, setPath] = useState<string[]>(initialPath);
  const [listing, setListing] = useState<DirListing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<{
    name: string;
    contentType: string;
    text?: string;
    json?: unknown;
  } | null>(null);

  const apiPath = useMemo(() => {
    const suffix = path.length ? "/" + path.join("/") : "";
    return `/api/rite${suffix}`;
  }, [path]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setPreview(null);
    fetch(apiPath)
      .then(async (res) => {
        const ctype = res.headers.get("content-type") || "";
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || `HTTP ${res.status}`);
        }
        if (ctype.includes("application/json")) {
          const data = await res.json();
          // Heuristic: directory listing returns an object with `entries`
          if (data && data.entries && Array.isArray(data.entries)) {
            if (!cancelled) setListing(data as DirListing);
            return;
          }
          // Otherwise, it's a JSON file
          if (!cancelled) {
            setListing(null);
            setPreview({
              name: path[path.length - 1] || "(root)",
              contentType: ctype,
              json: data
            });
          }
        } else {
          // Likely XML or text file
          const text = await res.text();
          if (!cancelled) {
            setListing(null);
            setPreview({
              name: path[path.length - 1] || "(root)",
              contentType: ctype,
              text
            });
          }
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [apiPath, path]);

  const toRoute = (segments: string[]) => {
    return `/data${segments.length ? "/" + segments.join("/") : ""}`;
  };

  const openDir = (name?: string) => {
    const next = name ? [...path, name] : path;
    router.push(toRoute(next) as any);
    setPath(next);
  };

  const goUp = (index: number) => {
    const next = path.slice(0, index);
    router.push(toRoute(next) as any);
    setPath(next);
  };

  const previewFile = async (name: string) => {
    const suffix = [...path, name].join("/");
    const res = await fetch(`/api/rite/${suffix}`);
    if (!res.ok) {
      setError(`Failed to load file: ${name}`);
      return;
    }
    const ctype = res.headers.get("content-type") || "";
    if (ctype.includes("application/json")) {
      const data = await res.json();
      setPreview({ name, contentType: ctype, json: data });
    } else {
      const text = await res.text();
      setPreview({ name, contentType: ctype, text });
    }
  };

  return (
    <div className="data-browser">
      <h1>Data Browser</h1>

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href={"/data" as any} onClick={(e) => { e.preventDefault(); goUp(0); }}>
          data
        </Link>
        {path.map((seg, i) => (
          <span key={i}>
            {' / '}
            <Link
              href={toRoute(path.slice(0, i + 1)) as any}
              onClick={(e) => {
                e.preventDefault();
                goUp(i + 1);
              }}
            >
              {seg}
            </Link>
          </span>
        ))}
      </nav>

      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}

      {listing && (
        <div className="listing">
          <h2>Directory</h2>
          {path.length > 0 && (
            <button onClick={() => goUp(path.length - 1)} aria-label="Up one level">
              ⬆︎ Up
            </button>
          )}
          <ul>
            {listing.entries.map((e) => (
              <li key={e.name}>
                {e.type === "dir" ? (
                  <button onClick={() => openDir(e.name)} className="dir">
                    📁 {e.name}
                  </button>
                ) : (
                  <button onClick={() => previewFile(e.name)} className="file">
                    📄 {e.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {preview && (
        <div className="preview">
          <h2>Preview: {preview.name}</h2>
          <p className="content-type">{preview.contentType}</p>
          {preview.json ? (
            <pre>{JSON.stringify(preview.json, null, 2)}</pre>
          ) : (
            <pre>{preview.text}</pre>
          )}
        </div>
      )}

      {!loading && !error && !listing && !preview && (
        <p>No content.</p>
      )}
    </div>
  );
}
