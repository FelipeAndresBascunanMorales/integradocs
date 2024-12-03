import { useState } from 'react';
// import { Mail, Phone, MapPin, Loader } from 'lucide-react';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitContactForm } from '../context/appwriteProvider';

function ContactSection() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
    phone: ''
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormStatus({ type: 'error', message: 'Por favor ingrese su nombre' });
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Por favor ingrese un email válido' });
      return false;
    }
    if (!formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Por favor ingrese un mensaje' });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Save to Appwrite
      await submitContactForm(formData);

      // Show success message
      setFormStatus({
        type: 'success',
        message: '¡Mensaje enviado con éxito! Nos contactaremos pronto contigo.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        company: '',
        phone: ''
      });

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        type: 'error',
        message: 'Hubo un error al enviar el mensaje. Por favor intente nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          Contacta con Nuestros Especialistas
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nuestro equipo de expertos está listo para ayudarte a encontrar e implementar 
          la mejor solución para tu negocio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 mx-auto max-w-2xl">
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Envíanos un mensaje</h3>
          
          {formStatus.message && (
            <div className={`mb-4 p-3 rounded-md ${
              formStatus.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              {formStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empresa
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje *
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus:outline-none"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Enviando...
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </button>
          </form>
        </div>
{/* 
       
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-5 w-5 text-indigo-600" />
                <span>contacto@veelotu.cl</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5 text-indigo-600" />
                <span>+56 9 XXXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 text-indigo-600" />
                <span>Santiago, Chile</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Horario de Atención</h3>
            <div className="space-y-2 text-gray-600">
              <p>Lunes a Viernes: 9:00 - 18:00</p>
              <p>Sábado: 9:00 - 13:00</p>
              <p>Domingo: Cerrado</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ContactSection;