function ConfirmModal({ mensaje, onConfirmar, onCancelar }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
        <h3 className="text-lg font-bold text-teal-900 mb-4">{mensaje}</h3>
        <div className="flex gap-3">
          <button
            onClick={onConfirmar}
            className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition"
          >
            Sí, salir
          </button>
          <button
            onClick={onCancelar}
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;