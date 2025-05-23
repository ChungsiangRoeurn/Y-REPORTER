'use client';

import type { BorrowedItem } from '@/lib/borrowedReportStore';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type InvoiceProps = {
    item: BorrowedItem;
};

export default function Invoice({ item }: InvoiceProps) {
    const printRef = React.useRef(null);

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
        const imgProps = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice-${item.id}.pdf`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 w-full flex justify-center items-center bg-background"
        >
            <Card className="w-full max-w-3xl shadow-xl p-17">
                <CardHeader>
                    <CardTitle className="text-2xl">Invoice</CardTitle>
                    <CardDescription>Invoice for book borrowing ID: {item.id}</CardDescription>
                </CardHeader>

                <CardContent ref={printRef} className="space-y-6 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-foreground">Borrower Info</h3>
                            <p>{item.borrower}</p>
                            <p>{item.phone}</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-base font-semibold text-foreground">Date</h3>
                            <p>{item.date}</p>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-base font-semibold text-foreground">Book Information</h3>
                        <p>Title: {item.title}</p>
                    </div>

                    <Separator />

                    <div className="flex justify-center pt-4">
                        <Button onClick={handleDownloadPdf} className="w-full sm:w-auto">
                            Download PDF
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
