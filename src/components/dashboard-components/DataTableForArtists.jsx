"use client";
import { memo, useRef, useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalTooltip from "../ui/GlobalTooltip";
import { sampleDataForDataTable } from "@/data/dummyDataForCharts";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";

const StreamDataTable = memo(() => {
  const [data, setData] = useState(sampleDataForDataTable);
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState("");
  const itemsPerPage = useRef(10);

  const artists = useRef(
    [...new Set(sampleDataForDataTable.map((item) => item.artist))].sort().map((artist) => ({
      value: artist,
      label: artist,
    }))
  );

  const handleSort = (column) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        const sortedData = [...data].sort((a, b) => b[column] - a[column]);
        setData(sortedData);
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setData(sampleDataForDataTable);
        setSortDirection("");
        setSortColumn("");
      }
    } else {
      const sortedData = [...data].sort((a, b) => a[column] - b[column]);
      setData(sortedData);
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const filteredData = data.filter(
    (item) =>
      (searchTerm === "" ||
        item.songName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.artist.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedArtist === "" || item.artist === selectedArtist)
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage.current);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage.current,
    currentPage * itemsPerPage.current
  );

  return (
    <div className="min-h-screen lg:w-[81%] mx-auto bg-background">
      <div className="mt-10 mb-8 flex items-center space-x-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search songs or artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="max-w-[200px] min-w-[110px] overflow-hidden"
            >
              <p className="!text-sm max-w-[90%] overflow-hidden">
                {selectedArtist
                  ? artists.current.find((artist) => artist.value === selectedArtist)?.label
                  : "Filter by artist..."}
              </p>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0">
            <Command>
              <CommandInput placeholder="Search artist..." />
              <CommandList>
                <CommandEmpty>No artist found.</CommandEmpty>
                <CommandGroup>
                  <Button
                    className="ml-6 mt-2 mb-4 w-[80%] rounded-3xl"
                    variant="outline"
                    onClick={() => {
                      setSelectedArtist("");
                      setOpen(false);
                      setCurrentPage(1);
                    }}
                  >
                    Reset
                  </Button>

                  {artists.current.map((artist) => (
                    <CommandItem
                      key={artist.value}
                      value={artist.value}
                      onSelect={(currentValue) => {
                        setSelectedArtist(currentValue === selectedArtist ? "" : currentValue);
                        setOpen(false);
                        setCurrentPage(1);
                      }}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedArtist === artist.value ? "opacity-100" : "opacity-0")}
                      />
                      {artist.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex gap-2">
          <GlobalTooltip
            content={<p>Sort by plays (ascending)</p>}
            trigger={
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSort("streamCount")}
                className={sortColumn === "streamCount" && sortDirection === "asc" ? "bg-accent" : ""}
              >
                <ArrowUpIcon className="h-4 w-4" />
              </Button>
            }
          />

          <GlobalTooltip
            content={<p>Sort by plays (descending)</p>}
            trigger={
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSort("streamCount")}
                className={sortColumn === "streamCount" && sortDirection === "desc" ? "bg-accent" : ""}
              >
                <ArrowDownIcon className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      </div>

      <div className="w-full">
        <table className="w-full border !border-[#353232] border-collapse">
          <thead className="border !border-[#353232]">
            <tr className="bg-muted/50">
              <th className="p-4 text-left whitespace-nowrap">Song Name</th>
              <th className="p-4 text-left whitespace-nowrap">Artist</th>
              <th className="p-4 text-left whitespace-nowrap">Date Streamed</th>
              <th className="p-4 text-left whitespace-nowrap">Stream Count</th>
              <th className="p-4 text-left whitespace-nowrap">User ID</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 border !border-[#353232] text-muted-foreground">
                  No results found!
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-muted/50 border-b !border-[#353232]">
                  <td className="p-4 whitespace-nowrap">{item.songName}</td>
                  <td className="p-4 whitespace-nowrap">{item.artist}</td>
                  <td className="p-4 whitespace-nowrap">{item.dateStreamed}</td>
                  <td className="p-4 whitespace-nowrap">{item.streamCount}</td>
                  <td className="p-4 whitespace-nowrap">{item.userId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {paginatedData.length > 0 && (
        <div className="p-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {pageCount}
          </span>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <Button className='mt-10'>
        <Link href={"/"}>Home Page</Link>
      </Button>
    </div>
  );
});

export default StreamDataTable;
StreamDataTable.displayName = "StreamDataTable";
