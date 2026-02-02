import React, { createContext, useContext, useState, useEffect } from 'react';

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
    const [sales, setSales] = useState(() => {
        try {
            const saved = localStorage.getItem('ahmed_sales');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to parse sales from localStorage', e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('ahmed_sales', JSON.stringify(sales));
    }, [sales]);

    const recordSale = (items, total) => {
        const newSale = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            items: items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total
        };
        setSales(prev => [...prev, newSale]);
    };

    const getSalesSummary = (period, customRange = null) => {
        const now = new Date();
        let startDate = new Date();
        let endDate = new Date(now.getTime() + 86400000); // Default to tomorrow to include today's sales

        if (period === 'daily') {
            startDate.setHours(0, 0, 0, 0);
        } else if (period === 'weekly') {
            startDate.setDate(now.getDate() - 7);
        } else if (period === 'monthly') {
            startDate.setMonth(now.getMonth() - 1);
        } else if (period === 'custom' && customRange) {
            startDate = new Date(customRange.start);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(customRange.end);
            endDate.setHours(23, 59, 59, 999);
        }

        const filteredSales = sales.filter(sale => {
            const saleDate = new Date(sale.timestamp);
            return saleDate >= startDate && saleDate <= endDate;
        });

        const summary = filteredSales.reduce((acc, sale) => {
            acc.totalRevenue += sale.total;
            sale.items.forEach(item => {
                if (!acc.items[item.name]) {
                    acc.items[item.name] = { quantity: 0, revenue: 0, price: item.price };
                }
                acc.items[item.name].quantity += item.quantity;
                acc.items[item.name].revenue += item.price * item.quantity;
                acc.totalPlates += item.quantity;
            });
            return acc;
        }, { totalRevenue: 0, totalPlates: 0, items: {} });

        return {
            ...summary,
            saleCount: filteredSales.length,
            period,
            startDate,
            endDate: period === 'custom' ? endDate : now
        };
    };

    return (
        <SalesContext.Provider value={{ sales, recordSale, getSalesSummary }}>
            {children}
        </SalesContext.Provider>
    );
};

export const useSales = () => useContext(SalesContext);
