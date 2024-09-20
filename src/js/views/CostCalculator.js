import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const CostCalculator = () => {
  const [salsaIngredients, setSalsaIngredients] = useState([{ name: '', cost: '', quantity: '', usedQuantity: '', unit: 'ml' }]);
  const [numContainers, setNumContainers] = useState(''); // Cantidad de potes
  const [containerCost, setContainerCost] = useState(''); // Costo por pote
  const [totalSalsaCost, setTotalSalsaCost] = useState(0); // Costo total de salsa
  const [costPerContainer, setCostPerContainer] = useState(0); // Costo por pote de salsa
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error

  const calculateSalsaCost = () => {
    const totalCost = salsaIngredients.reduce((acc, ingredient) => {
      const costPerUnit = parseFloat(ingredient.cost) || 0;
      const usedQuantity = parseFloat(ingredient.usedQuantity) || 0;
      const totalIngredientCost = (costPerUnit / (parseFloat(ingredient.quantity) || 1)) * usedQuantity;
      return acc + totalIngredientCost;
    }, 0);

    setTotalSalsaCost(totalCost);

    const containers = parseFloat(numContainers) || 1; // Cantidad de potes
    const totalContainerCost = (parseFloat(containerCost) || 0) * containers; // Costo total de los potes
    const totalCostPerContainer = math.divide(totalCost + totalContainerCost, containers);
    setCostPerContainer(totalCostPerContainer);
  };

  const addIngredient = () => {
    setSalsaIngredients(prev => [...prev, { name: '', cost: '', quantity: '', usedQuantity: '', unit: 'ml' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    setSalsaIngredients(prev => {
      const updatedIngredients = [...prev];
      updatedIngredients[index][field] = value;
      return updatedIngredients;
    });
  };

  const removeIngredient = (index) => {
    setSalsaIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleNumberChange = (index, field, value) => {
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setErrorMessage('');
      handleIngredientChange(index, field, value);
    } else {
      setErrorMessage('Solo se permiten números.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Calculador de Costos de Salsa por Pote</h1>

      <h2 className="text-lg font-semibold mb-2">Ingredientes de la Salsa</h2>
      {salsaIngredients.map((ingredient, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <input
            className="border p-2 rounded w-1/4"
            type="text"
            placeholder="Ingrediente"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
          />
          <input
            className="border p-2 rounded w-1/4"
            type="text"
            placeholder="Costo"
            value={ingredient.cost}
            onChange={(e) => handleNumberChange(index, 'cost', e.target.value)}
          />
          <input
            className="border p-2 rounded w-1/4"
            type="text"
            placeholder="Cantidad total"
            value={ingredient.quantity}
            onChange={(e) => handleNumberChange(index, 'quantity', e.target.value)}
          />
          <select
            className="border p-2 rounded w-1/4"
            value={ingredient.unit}
            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
          >
            <option value="ml">ml</option>
            <option value="g">g</option>
          </select>
          <input
            className="border p-2 rounded w-1/4"
            type="text"
            placeholder="Cantidad usada"
            value={ingredient.usedQuantity}
            onChange={(e) => handleNumberChange(index, 'usedQuantity', e.target.value)}
          />
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={() => removeIngredient(index)}
          >
            Eliminar
          </button>
        </div>
      ))}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        className="bg-yellow-500 text-white p-2 rounded"
        onClick={addIngredient}
      >
        Agregar Ingrediente
      </button>

      {/* Tabla de ingredientes */}
      <h2 className="text-lg font-semibold mt-4">Resumen de Ingredientes</h2>
      <table className="min-w-full border-collapse border border-gray-200 mt-2">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Ingrediente</th>
            <th className="border border-gray-300 p-2">Costo</th>
            <th className="border border-gray-300 p-2">Cantidad Total</th>
            <th className="border border-gray-300 p-2">Unidad</th>
            <th className="border border-gray-300 p-2">Cantidad Usada</th>
            <th className="border border-gray-300 p-2">Costo Total</th>
          </tr>
        </thead>
        <tbody>
          {salsaIngredients.map((ingredient, index) => {
            const totalIngredientCost = (parseFloat(ingredient.cost) || 0) / (parseFloat(ingredient.quantity) || 1) * (parseFloat(ingredient.usedQuantity) || 0);
            return (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{ingredient.name}</td>
                <td className="border border-gray-300 p-2">{ingredient.cost}</td>
                <td className="border border-gray-300 p-2">{ingredient.quantity}</td>
                <td className="border border-gray-300 p-2">{ingredient.unit}</td>
                <td className="border border-gray-300 p-2">{ingredient.usedQuantity}</td>
                <td className="border border-gray-300 p-2">{totalIngredientCost.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4">
        <input
          className="border p-2 rounded w-full"
          type="number"
          placeholder="Número de potes"
          value={numContainers}
          onChange={(e) => setNumContainers(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full mt-2"
          type="number"
          placeholder="Costo por pote"
          value={containerCost}
          onChange={(e) => setContainerCost(e.target.value)}
        />

        <button
          className="bg-black text-white p-2 rounded mt-2"
          onClick={calculateSalsaCost}
        >
          Calcular Costo Total por Pote
        </button>

        <p className="mt-2 text-lg">Costo total de la salsa: S/ {totalSalsaCost.toFixed(2)}</p>
        <p className="mt-2 text-lg">Costo por pote de salsa: S/ {costPerContainer.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CostCalculator;
