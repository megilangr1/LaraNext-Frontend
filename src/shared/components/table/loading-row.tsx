import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface LoadingRowProps {
  colsPan: number;
}

const LoadingRow = ({ colsPan }: LoadingRowProps) => {
  return (
    <TableRow>
      <TableCell colSpan={colsPan}>
        <Skeleton className="h-[20vh]" />
      </TableCell>
    </TableRow>
  );
};

export default LoadingRow;
