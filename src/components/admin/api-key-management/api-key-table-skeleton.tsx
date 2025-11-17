"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {observer} from "mobx-react"

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
)

function ApiKeyTableSkeleton() {
  return (
  <div className="hidden md:block border rounded-lg overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead className="hidden lg:table-cell w-[140px]">Created Date</TableHead>
          <TableHead className="hidden lg:table-cell w-[140px]">Last Used</TableHead>
          <TableHead className="text-right w-[180px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((i) => (
          <TableRow key={i}>
            <TableCell>
              <SkeletonBox className="h-4 w-12" />
            </TableCell>
            <TableCell>
              <SkeletonBox className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <SkeletonBox className="h-5 w-16" />
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <SkeletonBox className="h-4 w-24" />
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <SkeletonBox className="h-4 w-24" />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <SkeletonBox className="h-6 w-10" />
                <SkeletonBox className="h-8 w-8" />
                <SkeletonBox className="h-8 w-8" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>

  )
}

export default observer(ApiKeyTableSkeleton)
