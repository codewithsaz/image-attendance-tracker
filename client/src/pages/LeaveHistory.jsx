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
import NewLeaveForm from "../components/NewLeaveForm";

const fetcher = (url) => customAxios.get(url).then((res) => res.data);
const LeaveHistory = () => {
  const [page, setPage] = React.useState(1);
  const limit = 5;

  const { data, isLoading } = useSWR(
    `/employee-leave?page=${page}&limit=${limit}`,
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
      <div className="flex justify-between px-2">
        <h1 className="font-bold text-2xl">Leave History</h1>
        <NewLeaveForm />
      </div>

      <Table
        aria-label="Example table with client async pagination"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="warning"
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
          <TableColumn key="checkInTime">Date</TableColumn>
          {/* <TableColumn key="employeeID">EmpID</TableColumn>
          <TableColumn key="name">Name</TableColumn> */}
          <TableColumn key="designation">Reason</TableColumn>
          <TableColumn key="workingStatus">Status</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.leaves ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow className="" key={item.date}>
              {/* <TableCell>{`${item.employeeID}`}</TableCell> */}
              {/* <TableCell>{item.name}</TableCell> */}
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell
                className={
                  item.status === "approved"
                    ? " text-green-700 font-semibold "
                    : ""
                }
              >
                {item.status}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaveHistory;
