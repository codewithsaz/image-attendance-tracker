import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import useSWR from "swr";
import customAxios from "../utils/customAxios";

const fetcher = (url) => customAxios.get(url).then((res) => res.data);

const OldLeaveRequestTable = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const { data, isLoading } = useSWR(
    `/all-employee-past-leave?page=${page}&limit=${limit}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const pages = useMemo(() => {
    return data?.pagination?.totalPages
      ? Math.ceil(data.pagination.totalPages / limit)
      : 0;
  }, [data?.pagination, limit]);

  const loadingState =
    isLoading || data?.pagination.totalLeave >= 0 ? "idle" : "loading";

  return (
    <div className="flex flex-col p-2">
      <h1 className="font-bold text-2xl">Past Leave Request</h1>

      <Table
        aria-label="Example table with client async pagination"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
        className=" overflow-x-auto"
      >
        <TableHeader>
          <TableColumn key="employeeID">EmpID</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="designation">Reason</TableColumn>
          <TableColumn key="checkInTime">Date</TableColumn>
          <TableColumn key="workingStatus">Status</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.leaves ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow className="" key={item._id}>
              <TableCell>{`${item.employeeID}`}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OldLeaveRequestTable;
