import { useState, useRef } from "react";
import { X, Play } from "lucide-react";

interface VideoSectionProps {
  title: string;
  description: string;
  founderName: string;
  founderTitle: string;
  founderImage: string;
  videoThumbnail: string;
  videoUrl: string;
}

const VideoSection = ({
  title,
  description,
  founderName,
  founderTitle,
  founderImage,
  videoThumbnail,
  videoUrl,
}: VideoSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (videoRef.current) {
      videoRef.current.src = 'about:blank';
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.src = videoUrl;
        }
      }, 100);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <section id="our-story" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">{title}</h2>
            <p className="text-gray-700 mb-6">{description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={founderImage} 
                  alt={founderName} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{founderName}</p>
                <p className="text-gray-600 text-sm">{founderTitle}</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl" style={{ paddingTop: '56.25%' }}>
              <img 
                src={videoThumbnail} 
                alt="Our Farm" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <button 
                onClick={openModal}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition duration-300"
                aria-label="Play video"
              >
                <div className="w-20 h-20 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                  <Play className="h-8 w-8 text-primary ml-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <div 
        className={`fixed inset-0 z-50 ${isModalOpen ? 'flex' : 'hidden'} items-center justify-center`}
        onClick={handleBackdropClick}
      >
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10 flex items-center justify-center h-full">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center z-10"
              aria-label="Close video"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative" style={{ paddingTop: '56.25%' }}>
              <iframe 
                ref={videoRef}
                className="absolute inset-0 w-full h-full"
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Naaso Farm Story"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
