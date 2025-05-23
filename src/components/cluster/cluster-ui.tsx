"use client";

import { getExplorerLink, GetExplorerLinkArgs } from "gill";
import Link from "next/link";

export function ExplorerLink({
  className,
  label = "",
  ...link
}: GetExplorerLinkArgs & {
  className?: string;
  label: string;
}) {
  return (
    <Link
      href={getExplorerLink(link)}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? className : `link font-mono`}
    >
      {label}
    </Link>
  );
}
