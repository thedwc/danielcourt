import Link from "next/link";

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <h1>Error 404</h1>
      <p>
        Page not found - <Link href="/">return to the home page</Link>
      </p>
    </div>
  );
}
