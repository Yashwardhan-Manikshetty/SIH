import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar, Search, TrendingUp, BarChart3, Users, ShoppingCart } from "lucide-react";

interface MarketData {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

export default function AgmarknetDashboard() {
  const [data, setData] = useState<MarketData[]>([]);
  const [filteredData, setFilteredData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [marketFilter, setMarketFilter] = useState("");
  const [commodity, setCommodity] = useState("");

  // Dropdown options
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);

  // Date (yesterday's date)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const displayDate = yesterday.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const url =
        "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd00000156ada50532e9494e7b6db332a28584ed&format=json&limit=100&&filters[state.keyword]=Maharashtra";
      
        const response = await fetch(url);
      
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      
        const json = await response.json();
        console.log("API records:", json.records);
      
        if (!json.records || !Array.isArray(json.records)) {
          throw new Error("No records found in API response");
        }
      
        setData(json.records);
        setFilteredData(json.records);

        // Populate state options - ensure we get all unique states
        const uniqueStates = Array.from(new Set(
          json.records
            .map((item: MarketData) => item.state)
            .filter(Boolean) // Remove any null/undefined values
        )).sort() as string[];
        
        setStates(uniqueStates);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Update dropdowns when state/district changes
  useEffect(() => {
    if (stateFilter) {
      const filteredDistricts = Array.from(new Set(
        data
          .filter((item) => item.state === stateFilter)
          .map((item) => item.district)
          .filter(Boolean)
      )).sort();
      setDistricts(filteredDistricts);
      setDistrictFilter("");
      setMarkets([]);
      setMarketFilter("");
    } else {
      setDistricts([]);
      setMarkets([]);
    }
  }, [stateFilter, data]);

  useEffect(() => {
    if (districtFilter && stateFilter) {
      const filteredMarkets = Array.from(new Set(
        data
          .filter(
            (item) =>
              item.state === stateFilter && item.district === districtFilter
          )
          .map((item) => item.market)
          .filter(Boolean)
      )).sort();
      setMarkets(filteredMarkets);
      setMarketFilter("");
    } else {
      setMarkets([]);
    }
  }, [districtFilter, stateFilter, data]);

  // Filtering logic
  useEffect(() => {
    let filtered = data;

    if (stateFilter) {
      filtered = filtered.filter((item) => item.state === stateFilter);
    }
    if (districtFilter) {
      filtered = filtered.filter((item) => item.district === districtFilter);
    }
    if (marketFilter) {
      filtered = filtered.filter((item) => item.market === marketFilter);
    }
    if (commodity) {
      filtered = filtered.filter((item) =>
        item.commodity.toLowerCase().includes(commodity.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [stateFilter, districtFilter, marketFilter, commodity, data]);

  const clearFilters = () => {
    setStateFilter("");
    setDistrictFilter("");
    setMarketFilter("");
    setCommodity("");
  };

  // Calculate statistics
  const stats = {
    totalRecords: filteredData.length,
    uniqueStates: new Set(filteredData.map(item => item.state)).size,
    uniqueCommodities: new Set(filteredData.map(item => item.commodity)).size,
    averagePrice: filteredData.length > 0 
      ? Math.round(filteredData.reduce((sum, item) => sum + parseFloat(item.modal_price || '0'), 0) / filteredData.length)
      : 0
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-agricultural-green/5 to-agricultural-light/10">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Back to Dashboard Button */}
        <div>
          <button
            onClick={() => window.location.href = "/dashboard"} // Replace with your dashboard route
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors mb-4"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-agricultural-light flex items-center justify-center shadow-lg bg-green-500 sticky top-0 z-10">
              <TrendingUp className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-agricultural-green to-agricultural-light bg-clip-text ">
                Get Current Market Prices
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Real-time Agricultural Market Intelligence
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground bg-card/50 backdrop-blur-sm rounded-full px-6 py-2 border">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">Market Prices as of {displayDate} (per Quintal)</span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Records Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-agricultural-green/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Records</p>
                  <p className="text-3xl font-bold text-agricultural-green">{stats.totalRecords.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-agricultural-green/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-agricultural-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* States Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-agricultural-light/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">States</p>
                  <p className="text-3xl font-bold text-agricultural-light">{stats.uniqueStates}</p>
                </div>
                <div className="w-12 h-12 bg-agricultural-light/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-agricultural-light" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commodities Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-agricultural-earth/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Commodities</p>
                  <p className="text-3xl font-bold text-agricultural-earth">{stats.uniqueCommodities}</p>
                </div>
                <div className="w-12 h-12 bg-agricultural-earth/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-agricultural-earth" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avg Price Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-agricultural-warm/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Price</p>
                  <p className="text-3xl font-bold text-agricultural-warm">₹{stats.averagePrice.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-agricultural-warm/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-agricultural-warm" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
