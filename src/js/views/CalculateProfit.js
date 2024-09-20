import React, { useState } from 'react';

const ProfitCalculator = () => {
  const [products, setProducts] = useState([{ name: '', cost: '', salePrice: '' }]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [profit, setProfit] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);

  // Función para calcular la ganancia y el porcentaje
  const calculateProfit = () => {
    const costSum = products.reduce((acc, product) => acc + (parseFloat(product.cost) || 0), 0);
    const saleSum = products.reduce((acc, product) => acc + (parseFloat(product.salePrice) || 0), 0);

    setTotalCost(costSum);
    setTotalSale(saleSum);

    const profitCalc = saleSum - costSum;
    setProfit(profitCalc);

    const profitPercentageCalc = saleSum ? (profitCalc / saleSum) * 100 : 0;
    setProfitPercentage(profitPercentageCalc);
  };

  // Función para agregar un nuevo producto
  const addProduct = () => {
    setProducts([...products, { name: '', cost: '', salePrice: '' }]);
  };

  // Función para manejar cambios en los campos de los productos
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  // Función para eliminar un producto
  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Calculador de Ganancias por Productos</h1>

      <h2 className="text-lg font-semibold mb-2">Productos</h2>
      {products.map((product, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <input
            className="border p-2 rounded w-1/3"
            type="text"
            placeholder="Nombre del producto"
            value={product.name}
            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
          />
          <input
            className="border p-2 rounded w-1/3"
            type="number"
            placeholder="Costo"
            value={product.cost}
            onChange={(e) => handleProductChange(index, 'cost', e.target.value)}
          />
          <input
            className="border p-2 rounded w-1/3"
            type="number"
            placeholder="Precio de venta"
            value={product.salePrice}
            onChange={(e) => handleProductChange(index, 'salePrice', e.target.value)}
          />
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={() => removeProduct(index)}
          >
            Eliminar
          </button>
        </div>
      ))}
      <button
        className="bg-yellow-500 text-white p-2 rounded mt-2 m-2"
        onClick={addProduct}
      >
        Agregar Producto
      </button>

      <button
        className="bg-black text-white p-2 rounded mt-4"
        onClick={calculateProfit}
      >
        Calcular Ganancia
      </button>

      {/* Resultados */}
      <div className="mt-4">
        <p className="text-lg">Costo total de los productos: S/ {totalCost.toFixed(2)}</p>
        <p className="text-lg">Ingreso total por ventas: S/ {totalSale.toFixed(2)}</p>
        <p className="text-lg">Ganancia total: S/ {profit.toFixed(2)}</p>
        <p className="text-lg">Porcentaje de ganancia: {profitPercentage.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ProfitCalculator;

