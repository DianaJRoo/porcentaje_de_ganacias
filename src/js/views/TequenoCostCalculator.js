import React, { useState, useEffect } from 'react';
import { create, all } from 'mathjs';

const math = create(all);

const TequeñosCalculator = () => {
  const [tequeñosIngredients, setTequeñosIngredients] = useState([{ name: '', cost: '', quantity: '', usedQuantity: '', unit: 'ml' }]);
  const [numTequeños, setNumTequeños] = useState(''); // Cantidad de tequeños producidos
  const [tequeñosPerTray, setTequeñosPerTray] = useState(''); // Tequeños por bandeja
  const [numTrays, setNumTrays] = useState(''); // Cantidad de bandejas
  const [trayCost, setTrayCost] = useState(''); // Costo por bandeja
  const [labelCost, setLabelCost] = useState(''); // Costo por etiqueta
  const [numLabels, setNumLabels] = useState(''); // Cantidad de etiquetas
  const [totalTequeñosCost, setTotalTequeñosCost] = useState(0); // Costo total de los tequeños
  const [costPerTray, setCostPerTray] = useState(0); // Costo por bandeja
  const [costPerTequeño, setCostPerTequeño] = useState(0); // Costo por tequeño
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error

  const calculateTequeñosCost = () => {
    const totalCost = tequeñosIngredients.reduce((acc, ingredient) => {
      const costPerUnit = parseFloat(ingredient.cost) || 0;
      const usedQuantity = parseFloat(ingredient.usedQuantity) || 0;
      const totalIngredientCost = (costPerUnit / (parseFloat(ingredient.quantity) || 1)) * usedQuantity;
      return acc + totalIngredientCost;
    }, 0);

    const totalTequeños = parseFloat(numTequeños) || 1; // Cantidad de tequeños producidos
    const trays = parseFloat(numTrays) || 1; // Cantidad de bandejas
    const tequeñosPerTrayValue = parseFloat(tequeñosPerTray) || 1; // Tequeños por bandeja
    const totalTrayCost = (parseFloat(trayCost) || 0) * trays; // Costo total de las bandejas
    const totalLabelCost = (parseFloat(labelCost) || 0) * (parseFloat(numLabels) || 1); // Costo total de las etiquetas

    // Costo por bandeja considerando tequeños, bandejas y etiquetas
    const totalCostPerTray = math.divide(totalCost + totalTrayCost + totalLabelCost, trays);

    setTotalTequeñosCost(totalCost);
    setCostPerTray(totalCostPerTray);

    // Actualizar costo por tequeño
    if (totalTequeños > 0) {
      const costPerTequeño = math.divide(totalCost + totalTrayCost + totalLabelCost, totalTequeños);
      setCostPerTequeño(costPerTequeño);
    }
  };

  const addIngredient = () => {
    setTequeñosIngredients(prev => [...prev, { name: '', cost: '', quantity: '', usedQuantity: '', unit: 'ml' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    setTequeñosIngredients(prev => {
      const updatedIngredients = [...prev];
      updatedIngredients[index][field] = value;
      return updatedIngredients;
    });
  };

  const removeIngredient = (index) => {
    setTequeñosIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleNumberChange = (index, field, value) => {
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setErrorMessage('');
      handleIngredientChange(index, field, value);
    } else {
      setErrorMessage('Solo se permiten números.');
    }
  };

  useEffect(() => {
    // Recalcula el costo por tequeño cuando cambia el número de tequeños
    if (numTequeños) {
      calculateTequeñosCost();
    }
  }, [numTequeños, tequeñosIngredients, numTrays, trayCost, labelCost, numLabels]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Calculador de Costos de Tequeños por Bandeja</h1>

      <h2 className="text-lg font-semibold mb-2">Ingredientes de los Tequeños</h2>
      {tequeñosIngredients.map((ingredient, index) => (
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
      <button className="bg-yellow-500 text-white p-2 rounded" onClick={addIngredient}>
        Agregar Ingrediente
      </button>

      {/* Tabla de resumen de ingredientes */}
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
            <th className="border border-gray-300 p-2">Costo Usado</th>
          </tr>
        </thead>
        <tbody>
          {tequeñosIngredients.map((ingredient, index) => {
            const totalIngredientCost = (parseFloat(ingredient.cost) || 0) / (parseFloat(ingredient.quantity) || 1) * (parseFloat(ingredient.usedQuantity) || 0);
            return (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{ingredient.name}</td>
                <td className="border border-gray-300 p-2">{ingredient.cost}</td>
                <td className="border border-gray-300 p-2">{ingredient.quantity}</td>
                <td className="border border-gray-300 p-2">{ingredient.unit}</td>
                <td className="border border-gray-300 p-2">{ingredient.usedQuantity}</td>
                <td className="border border-gray-300 p-2">S/ {totalIngredientCost.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
        </div>
      {/* Datos adicionales */}
      <h2 className="text-lg font-semibold mt-4">Datos Adicionales</h2>
      <input
        className="border p-2 rounded w-full mt-2"
        type="number"
        placeholder="Cantidad total de tequeños"
        value={numTequeños}
        onChange={(e) => setNumTequeños(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mt-2"
        type="number"
        placeholder="Tequeños por bandeja"
        value={tequeñosPerTray}
        onChange={(e) => setTequeñosPerTray(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mt-2"
        type="number"
        placeholder="Número de bandejas"
        value={numTrays}
        onChange={(e) => setNumTrays(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mt-2"
        type="number"
        placeholder="Costo por bandeja"
        value={trayCost}
        onChange={(e) => setTrayCost(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mt-2"
        type="number"
        placeholder="Número de etiquetas"
        value={numLabels}
        onChange={(e) => setNumLabels(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mt-2"
        type="number"
        placeholder="Costo por etiqueta"
        value={labelCost}
        onChange={(e) => setLabelCost(e.target.value)}
      />

      <button className="bg-black text-white p-2 rounded mt-2" onClick={calculateTequeñosCost}>
        Calcular Costo Total por Bandeja
      </button>

      <p className="mt-2 text-lg">Costo total de los tequeños: S/ {totalTequeñosCost.toFixed(2)}</p>
      <p className="mt-2 text-lg">Costo por bandeja de tequeños: S/ {costPerTray.toFixed(2)}</p>
      <p className="mt-2 text-lg">Costo por tequeño: S/ {costPerTequeño.toFixed(2)}</p>
    </div>
  );
};

export default TequeñosCalculator;


















