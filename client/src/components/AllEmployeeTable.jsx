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
import { useNavigate } from "react-router-dom";

const fetcher = (url) => customAxios.get(url).then((res) => res.data);

const AllEmployeeTable = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;

  const { data, isLoading } = useSWR(
    `/all-employee-details?page=${page}&limit=${limit}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );
  const navigate = useNavigate();
  const handleEmployeeProfile = (empID) => {
    navigate(`employee/${empID}`);
  };
  const pages = useMemo(() => {
    return data?.pagination?.totalPages
      ? Math.ceil(data.pagination.totalPages / limit)
      : 0;
  }, [data?.pagination, limit]);

  const loadingState =
    isLoading || data?.employees.length === 0 ? "loading" : "idle";

  return (
    <div className="flex flex-col p-2">
      <h1 className="font-bold text-2xl">All Employees</h1>

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
          <TableColumn key="employeeID">ID</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="designation">Designation</TableColumn>
          <TableColumn key="checkInTime">checkInTime</TableColumn>
          <TableColumn key="workingStatus">Status</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.employees ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow
              className=" cursor-pointer hover:bg-zinc-200 my-1 rounded-md"
              key={item.employeeID}
              onClick={() => {
                handleEmployeeProfile(item.employeeID);
              }}
            >
              <TableCell>{`${item.employeeID}`}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.designation}</TableCell>
              <TableCell>{item.checkInTime}</TableCell>
              <TableCell>
                {item.workingStatus}
                <span
                  className={
                    item.breakStatus
                      ? " text-orange-500 animate-pulse mx-1"
                      : " hidden"
                  }
                >
                  On Break
                </span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllEmployeeTable;
