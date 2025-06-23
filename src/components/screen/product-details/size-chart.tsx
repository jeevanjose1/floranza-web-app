import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

type Props = { product: any }

export default function SizeChart({ product }: Props) {
    const table_data = JSON.parse(product?.size_chart?.jsonData) || []
    const head = table_data?.[0]
    const rows = table_data?.slice(1)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <h3 className="text-blue-400 font-semibold text-sm hover:underline cursor-pointer">Size Chart</h3>

            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Size Chart
                    </DialogTitle>
                </DialogHeader>
                <div className="w-full px-4 pt-2 pb-4 max-h-96 overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {head?.map((item: string, index: number) => (
                                    <TableHead key={index}>{item}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows?.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    {item?.map((sub: any, subIndex: number) => (
                                        <TableCell
                                            key={`${index}-${subIndex}`}
                                            className="font-medium !text-xs"
                                        >
                                            {sub}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    )
}