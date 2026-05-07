import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type CrudFilter, useList } from "@refinedev/core";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import { ClassDetails, Subject, User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ShowButton } from "@/components/refine-ui/buttons/show";

const ClassesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState("all");

  const { data: subjectsData } = useList<Subject>({
    resource: "subjects",
    pagination: { pageSize: 100 },
  });

  const { data: teachersData } = useList<User>({
    resource: "users",
    filters: [{ field: "role", operator: "eq", value: "teacher" }],
    pagination: { pageSize: 100 },
  });

  const subjects = subjectsData?.data ?? [];
  const teachers = teachersData?.data ?? [];

  const subjectFilters: CrudFilter[] =
    selectedSubject === "all"
      ? []
      : [{ field: "subject", operator: "eq", value: selectedSubject }];

  const teacherFilters: CrudFilter[] =
    selectedTeacher === "all"
      ? []
      : [{ field: "teacher", operator: "eq", value: selectedTeacher }];

  const searchFilters: CrudFilter[] = searchQuery
    ? [{ field: "name", operator: "contains", value: searchQuery }]
    : [];

  const classTable = useTable<ClassDetails>({
    columns: useMemo<ColumnDef<ClassDetails>[]>(
      () => [
        {
          id: "banner",
          accessorKey: "bannerUrl",
          size: 80,
          header: () => <p className="column-title ml-2">Banner</p>,
          cell: ({ getValue }) => {
            const url = getValue<string | undefined>();
            return url ? (
              <img
                src={url}
                alt="banner"
                className="h-10 w-16 rounded object-cover"
              />
            ) : (
              <div className="h-10 w-16 rounded bg-muted" />
            );
          },
        },
        {
          id: "name",
          accessorKey: "name",
          size: 200,
          header: () => <p className="column-title ml-2">Class Name</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>()}</span>
          ),
        },
        {
          id: "status",
          accessorKey: "status",
          size: 100,
          header: () => <p className="column-title ml-2">Status</p>,
          cell: ({ getValue }) => {
            const status = getValue<string>();
            return (
              <Badge variant={status === "active" ? "default" : "secondary"}>
                {status}
              </Badge>
            );
          },
        },
        {
          id: "subject",
          accessorKey: "subject.name",
          size: 150,
          header: () => <p className="column-title ml-2">Subject</p>,
          cell: ({ getValue }) => (
            <Badge variant="secondary">{getValue<string>()}</Badge>
          ),
        },
        {
          id: "teacher",
          accessorKey: "teacher.name",
          size: 150,
          header: () => <p className="column-title ml-2">Teacher</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>()}</span>
          ),
        },
        {
          id: "capacity",
          accessorKey: "capacity",
          size: 80,
          header: () => <p className="column-title ml-2">Capacity</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<number>()}</span>
          ),
        },
        {
          id: "details",
          size: 140,
          header: () => <p className="colum-title">Details:</p>,
          cell: ({ row }) => (
            <ShowButton
              resource="classes"
              recordItemId={row.original.id}
              variant="outline"
              size="sm"
            >
              View
            </ShowButton>
          ),
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "classes",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...subjectFilters, ...teacherFilters, ...searchFilters],
      },
      sorters: {
        initial: [{ field: "id", order: "desc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Classes</h1>

      <div className="intro-row">
        <p>Quick access to essential metrics and management tools.</p>

        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />
            <Input
              type="text"
              placeholder="Search by name ..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.name}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectTrigger>
            </Select>

            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by teacher" />
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.name}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectTrigger>
            </Select>

            <CreateButton resource="classes" />
          </div>
        </div>
      </div>

      <DataTable table={classTable} />
    </ListView>
  );
};

export default ClassesList;
