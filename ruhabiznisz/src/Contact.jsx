const Contact = () => {
  return (
    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Kapcsolat</h1>
      <p className="max-w-2xl text-center text-gray-300 text-lg mb-4">
        Kérdésed van? Elérsz minket a következő elérhetőségeken:
      </p>
      <ul className="text-gray-200 text-base space-y-2">
        <li>📞 +36 20 123 4567</li>
        <li>📩 info@luxshop.hu</li>
        <li>📍 Budapest, Andrássy út 66.</li>
      </ul>
    </section>
  );
};

export default Contact;
