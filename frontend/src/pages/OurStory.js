import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  MapPin, 
  Award, 
  BookOpen, 
  Target,
  Star,
  Heart
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import Reveal from '../components/Reveal';

const OurStory = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <PageBackground />
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <Reveal>
        <div className="text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            ගුරුවරයා ගේ ප්‍රේමයෙන්, දැනුමෙන් සහ කැපවීමෙන් අද Nadeeka Warnakula ශ්‍රී ලංකාව පුරා ප්‍රසිද්ධ නමක්
          </p>
        </div>
        </Reveal>

        {/* Teacher Introduction */}
        <div className="mb-16">
          <div className="bg-gray-800 border-gray-700 overflow-hidden rounded-lg">
            <div className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                {/* Text - left on desktop */}
                <div className="order-2 lg:order-1 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3">
                      <span role="img" aria-label="pen">🖊️</span>
                      ගුරුවරයා පිළිබඳව
                    </h2>
                  </div>

                  <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
                    <p>
                      2016 වසරේ ගාල්ල දිස්ත්‍රික්කයේ අන්තර්ලාභී උසස් පෙළ විභාගයේ කෙරෙහි පළිගත්
                      ජයග්‍රහණය ඉදිරියට ගෙන ආ ගමනේ ව්‍යාපාරික විෂයාවලියෙන් ඉහළ ප්‍රතිපල ලබාගෙන
                      ඉංජිනේරු විද්‍යා පීඨයට පුරුක් වීමට ලැබුණු අත්දැකීම් මත සිටින ගුරුතුමා/තුමා.
                    </p>
                    <p>
                      ඒ අනුව මොරටුවා විශ්වවිද්‍යාලයෙන් B.Sc Engineering (Hons) උපාධියත් සමඟ තමන්ගේ
                      අධ්‍යාපනික දැනුම දෙමාපියන්ගේ සහ ජනමාධ්‍යයේ සහයෝගයෙන් සිසුන් වෙනුවෙන් බෙදාහැරීමට
                      ආරම්භ කළේය.
                    </p>
                    <p>
                      අද දිනය වන තෙක් අවුරුදු කිහිපයක පළපුරුද්දක් සමඟ, A/L Chemistry විෂය පිළිබඳ විෂයඥයකු ලෙස
                      දඟර දූ පුතුවන් විශිෂ්ටත්වයට පත් කිරීමේ ශක්තිමත් ක්‍රමවේදයක් ගොඩනගා ඇත.
                    </p>
                    <p className="text-gray-400">
                      "Chemistry නම් Chemistry" — Nadeeka Warnakula නාමය කැපී පෙනෙන්නේ ඉතා ගුණාත්මක අධ්‍යාපන
                      සේවාවක් නිසි පාරදීතාවයකින් නිර්මාණය කිරීම නිසාය.
                    </p>
                  </div>
                </div>

                {/* Image - right on desktop with hover zoom */}
                <div className="order-1 lg:order-2 relative h-96 lg:h-auto group">
                  <img
                    src="/images/teacher-main.jpg"
                    alt="නදීක වර්ණකුල Sir"
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors rounded-lg">
              <div className="p-6 text-center">
                <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Humble Beginnings</h3>
                <p className="text-gray-400">
                  සීමිත ප්‍රදේශවලින් ආරම්භ වූ අපගේ ගමන, අද ශ්‍රී ලංකාව පුරා ව්‍යාප්ත වී ඇත.
                </p>
              </div>
            </div>

            <div className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors rounded-lg">
              <div className="p-6 text-center">
                <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Growing Community</h3>
                <p className="text-gray-400">
                  නගර සහ ග්‍රාමීය ප්‍රදේශවල සිසුන් දහස් ගණනක් අපගේ පවුල සමඟ එකතු වී ඇත.
                </p>
              </div>
            </div>

            <div className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors rounded-lg">
              <div className="p-6 text-center">
                <Star className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Excellence</h3>
                <p className="text-gray-400">
                  අඛණ්ඩ best results සමඟ අපගේ brand identity ශක්තිමත් කර ගෙන යාමු.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 border-orange-500 rounded-lg">
            <div className="p-8">
              <Target className="w-12 h-12 text-white mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-orange-100 text-lg leading-relaxed">
                සෑම සිසුවෙකුටම උසස් තත්ත්වයේ Chemistry අධ්‍යාපනය ලබා දීම. 
                ගුණාත්මක අධ්‍යාපනය හරහා සිසුන්ගේ අනාගතය සනකහන් කිරීම.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 border-gray-700 rounded-lg">
            <div className="p-8">
              <Heart className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Chemistry නම් Chemistry - මෙම සාරධර්මය සමඟ ශ්‍රී ලංකාවේ 
                අංක එකේ Chemistry brand ලෙස පිහිටීම.
              </p>
            </div>
          </div>
        </div>

        {/* What Makes Us Special */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Makes Nadeeka Warnakula Special
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-600 rounded-full p-2 mt-1">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Expert Teaching</h4>
                  <p className="text-gray-400">
                    University of Moratuwa engineering graduate with specialized chemistry expertise
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-600 rounded-full p-2 mt-1">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Proven Results</h4>
                  <p className="text-gray-400">
                    දිස්ත්‍රික් ප්‍රතමයන් රැසක් බිහි කළ අත්දැකීම් ඇති teaching methodology
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-600 rounded-full p-2 mt-1">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Island-wide Coverage</h4>
                  <p className="text-gray-400">
                    From Kalutara to Galle, Nugegoda to Monaragala - serving students everywhere
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-600 rounded-full p-2 mt-1">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Quality Assurance</h4>
                  <p className="text-gray-400">
                    අඛණ්ඩ best results සහතික කරන structured learning approach
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-600 rounded-full p-2 mt-1">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Personalized Attention</h4>
                  <p className="text-gray-400">
                    Small batch sizes ensuring individual attention for each student
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;