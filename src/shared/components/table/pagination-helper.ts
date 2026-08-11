type PaginationItem = number | "ellipsis";

export function generatePagination(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  const pages: PaginationItem[] = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  const left = Math.max(currentPage - 1, 2);
  const right = Math.min(currentPage + 1, totalPages - 1);

  if (left > 2) {
    pages.push("ellipsis");
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
}
