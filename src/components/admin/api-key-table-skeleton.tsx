"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse bg-muted rounded ${className}`} />
)

export const ApiKeyTableSkeleton = () => {
  return (
    <>
      {/* Desktop and Tablet: Table View */}
      <div className="hidden md:block border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
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

      {/* Mobile: Card View */}
      <div className="md:hidden space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <SkeletonBox className="h-5 w-32" />
                    <SkeletonBox className="h-3 w-20" />
                  </div>
                  <SkeletonBox className="h-5 w-16" />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <SkeletonBox className="h-3 w-16" />
                    <SkeletonBox className="h-4 w-24" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonBox className="h-3 w-16" />
                    <SkeletonBox className="h-4 w-24" />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <SkeletonBox className="h-4 w-12" />
                    <SkeletonBox className="h-6 w-10" />
                  </div>
                  <div className="flex items-center gap-1">
                    <SkeletonBox className="h-8 w-16" />
                    <SkeletonBox className="h-8 w-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
