import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';

import { sql } from '@vercel/postgres';

import { fetchCardData } from '@/app/lib/data';

// Vous devez définir ces fonctions pour récupérer les données nécessaires
async function fetchTotalPaidInvoices() {
  // Implémentez la logique pour récupérer le total des factures payées
  return 0;
}

async function fetchTotalPendingInvoices() {
  // Implémentez la logique pour récupérer le total des factures en attente
  return 0;
}

async function fetchNumberOfInvoices() {
  // Implémentez la logique pour récupérer le nombre total de factures
  return 0;
}

async function fetchNumberOfCustomers() {
  // Implémentez la logique pour récupérer le nombre total de clients
  return 0;
}

async function fetchLatestInvoices() {
  try {
    const response = await sql`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5
    `;
    console.log('Fetched invoices:', response.rows); // Ajout de la journalisation
    return response.rows;
  } catch (error) {
    console.error('Error fetching latest invoices:', error);
    return [];
  }
}


export default async function Page() {
  const revenue = await fetchRevenue();
  // const totalPaidInvoices = await fetchTotalPaidInvoices();
  // const totalPendingInvoices = await fetchTotalPendingInvoices();
  // const numberOfInvoices = await fetchNumberOfInvoices();
  // const numberOfCustomers = await fetchNumberOfCustomers();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
