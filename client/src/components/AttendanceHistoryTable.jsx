/* eslint-disable react/prop-types */
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
const AttendanceHistoryTable = (props) => {
  const [page, setPage] = React.useState(1);
  const limit = 5;

  const { data, isLoading } = useSWR(
    `/admin/employee-attendance/${props.employeeID}?page=${page}&limit=${limit}`,
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
    isLoading || data?.pagination.totalAttendance >= 0 ? "idle" : "loading";

  return (
    <div className="flex flex-col p-2">
      <h1 className="font-bold text-2xl">Attendance History</h1>

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
          <TableColumn key="date">Date</TableColumn>
          <TableColumn key="checkInTime">Check In</TableColumn>
          <TableColumn key="checkOutTime">Check Out</TableColumn>
          <TableColumn key="totalWorkingTime">Total Hors</TableColumn>
          <TableColumn key="totalBreakTime">Total Break</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.attendance ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item?.date.day}>
              <TableCell>{`${item.date.day}`}</TableCell>
              <TableCell>{item.checkInTime}</TableCell>
              <TableCell>{item.checkOutTime}</TableCell>
              <TableCell>{item.totalWorkingTime}</TableCell>
              <TableCell>{item.totalBreakTime}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceHistoryTable;
