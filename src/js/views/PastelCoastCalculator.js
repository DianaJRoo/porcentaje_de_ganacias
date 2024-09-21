import React, { useState } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const PastelCostCalculator = () => {
  const [cakeIngredients, setCakeIngredients] = useState([{ name: '', cost: '', quantity: '', usedQuantity: '', unit: 'ml' }]);
  const [numCakeSlices, setNumCakeSlices] = useState('');
  const [trayUnitCost, setTrayUnitCost] = useState('');
  const [numTrays, setNumTrays] = useState('');
  const [labelUnitCost, setLabelUnitCost] = useState('');
  const [numLabels, setNumLabels] = useState('');
  const [costPerSlice, setCostPerSlice] = useState(0);
  const [errorMessage, setErrorMessage] = useState(''); // Para manejar el mensaje de error

  const calculateSliceCost = () => {
    const totalIngredientCost = cakeIngredients.reduce((acc, ingredient) => {
      const costPerUnit = parseFloat(ingredient.cost) || 0;
      const usedQuantity = parseFloat(ingredient.usedQuantity) || 0;
      const totalCost = (costPerUnit / (parseFloat(ingredient.quantity) || 1)) * usedQuantity;
      return acc + totalCost;
    }, 0);

    const totalTrayCost = (parseFloat(trayUnitCost) || 0) * (parseFloat(numTrays) || 0);
    const totalLabelCost = (parseFloat(labelUnitCost) || 0) * (parseFloat(numLabels) || 0);

    const slices = parseFloat(numCakeSlices) || 1;
    const totalCostPerSlice = math.divide(totalIngredientCost + totalTrayCost + totalLabelCost, slices);

    setCostPerSlice(totalCostPerSlice);
  };

  const addIngredient = () => {
    setCakeIngredients(prev => [...prev, { name: '', cost: '', quantity: '', usedQuantity: '', unit: 'ml' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    setCakeIngredients(prev => {
      const updatedIngredients = [...prev];
      updatedIngredients[index][field] = value;
      return updatedIngredients;
    });
  };

  // Manejo de errores para solo permitir números
  const handleNumberChange = (index, field, value) => {
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setErrorMessage(''); // Limpiar el mensaje de error si el valor es válido
      handleIngredientChange(index, field, value);
    } else {
      setErrorMessage('Solo se permiten números.'); // Mostrar mensaje de error si no es número
    }
  };

  const removeIngredient = (index) => {
    setCakeIngredients(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Calculador de Costos para Realizar un Pastel</h1>

      <h2 className="text-lg font-semibold mb-2">Ingredientes del Pastel</h2>
      {cakeIngredients.map((ingredient, index) => (
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
      
      {/* Mostrar el mensaje de error si existe */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <button
        className="bg-yellow-500 text-white p-2 rounded"
        onClick={addIngredient}
      >
        Agregar Ingrediente
      </button>

      {/* Tabla de ingredientes */}
      <div className="overflow-x-auto">
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
          {cakeIngredients.map((ingredient, index) => {
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
     </div>
      <div className="mt-4">
        <input
          className="border p-2 rounded w-full"
          type="number"
          placeholder="Número de trozos por pastel"
          value={numCakeSlices}
          onChange={(e) => setNumCakeSlices(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full mt-2"
          type="number"
          placeholder="Costo por unidad de bandeja"
          value={trayUnitCost}
          onChange={(e) => setTrayUnitCost(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full mt-2"
          type="number"
          placeholder="Cantidad de bandejas usadas"
          value={numTrays}
          onChange={(e) => setNumTrays(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full mt-2"
          type="number"
          placeholder="Costo por unidad de etiqueta"
          value={labelUnitCost}
          onChange={(e) => setLabelUnitCost(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full mt-2"
          type="number"
          placeholder="Cantidad de etiquetas usadas"
          value={numLabels}
          onChange={(e) => setNumLabels(e.target.value)}
        />

        <button
          className="bg-black text-white p-2 rounded mt-2"
          onClick={calculateSliceCost}
        >
          Calcular Costo por Trozo
        </button>

        <p className="mt-2 text-lg">Costo total por trozo de pastel (ingredientes + bandeja + etiqueta): S/ {costPerSlice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PastelCostCalculator;




