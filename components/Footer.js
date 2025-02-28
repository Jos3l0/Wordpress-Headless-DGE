export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-content">
          <div className="footer-left">
            <a href="https://www.mendoza.gov.ar/educacion-cultura-infancias-dge/" target="_blank" rel="noopener noreferrer">
              <img src="https://des.mendoza.edu.ar/wp-content/uploads/2024/06/logominedupie.png" alt="Ministerio de Educación, Cultura, Infancias y D.G.E." />
            </a>
          </div>
          <div className="footer-right">
            <a href="https://www.mendoza.gov.ar/148/" target="_blank" rel="noopener noreferrer">
              <img src="https://des.mendoza.edu.ar/wp-content/uploads/2021/08/148.png" alt="Teléfono 148" />
            </a>
            <p>+54 261 385 2768 – <a href="https://www.mendoza.edu.ar/direcciones-y-telefonos/" target="_blank" rel="noopener noreferrer">Teléfonos de interés</a></p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>MENDOZA GOBIERNO</p>
        <div className="footer-social">
          <a href="https://www.facebook.com/MendozaDGE/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/MzaDGE" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-x-twitter"></i>
          </a>
          <a href="https://www.instagram.com/dgemendoza/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.youtube.com/@PortalEducativoDGE" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

