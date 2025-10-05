export default function NotAuthorized() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600">Acceso denegado</h1>
      <p className="mt-2 text-lg">No tiene permisos para ingresar a esta sección.</p>
    </div>
  );
}
