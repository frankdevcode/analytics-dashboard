import { useState, useEffect } from 'react';
import { dataAPI } from '../services/api';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import DataTable from '../components/DataTable';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const [data, setData] = useState({
    sales: [],
    users: [],
    categories: [],
    reports: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [salesRes, usersRes, categoriesRes, reportsRes] = await Promise.all([
          dataAPI.getSales(),
          dataAPI.getUsers(),
          dataAPI.getCategories(),
          dataAPI.getReports()
        ]);

        setData({
          sales: salesRes.data,
          users: usersRes.data,
          categories: categoriesRes.data,
          reports: reportsRes.data
        });
      } catch (err) {
        setError('Error al cargar los datos');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Error
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calcular estadísticas
  const totalSales = data.sales.reduce((sum, item) => sum + item.value, 0);
  const totalUsers = data.users.length > 0 ? data.users[data.users.length - 1].value : 0;
  const totalCategories = data.categories.length;
  const avgSales = data.sales.length > 0 ? totalSales / data.sales.length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard de Analytics</h1>
        <p className="mt-1 text-sm text-gray-600">
          Visualización de datos y métricas en tiempo real
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ventas Totales"
          value={`$${totalSales.toLocaleString()}`}
          icon="💰"
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Usuarios Activos"
          value={totalUsers.toLocaleString()}
          icon="👥"
          trend="+8%"
          trendUp={true}
        />
        <StatsCard
          title="Categorías"
          value={totalCategories}
          icon="📂"
          trend="+2"
          trendUp={true}
        />
        <StatsCard
          title="Promedio Ventas"
          value={`$${avgSales.toFixed(0)}`}
          icon="📊"
          trend="-3%"
          trendUp={false}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ventas por Mes</h3>
          <BarChart data={data.sales} />
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Crecimiento de Usuarios</h3>
          <LineChart data={data.users} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribución por Categoría</h3>
          <PieChart data={data.categories} />
        </div>

        {/* Data Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Reportes Recientes</h3>
          <DataTable data={data.reports} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;