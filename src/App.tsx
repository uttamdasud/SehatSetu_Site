import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { LocationModal } from './components/common/LocationModal';
import { NotificationsModal } from './components/notifications/NotificationsModal';
import { DigitalPrescriptionModal } from './components/prescription/DigitalPrescriptionModal';
import { BookingFlowModal } from './components/booking/BookingFlowModal';
import { HomeScreen } from './components/home/HomeScreen';
import { FindDoctorsScreen } from './components/doctors/FindDoctorsScreen';
import { DoctorProfileScreen } from './components/doctors/DoctorProfileScreen';
import { SymptomCheckerScreen } from './components/symptomChecker/SymptomCheckerScreen';
import { ConsultationsScreen } from './components/consultation/ConsultationsScreen';
import { VideoRoomModal } from './components/consultation/VideoRoomModal';
import { AppointmentsScreen } from './components/appointments/AppointmentsScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { HospitalDetailModal } from './components/hospitals/HospitalDetailModal';
import { BiometricAuthModal } from './components/biometrics/BiometricAuthModal';
import { DoctorOnboardingModal } from './components/onboarding/DoctorOnboardingModal';
import { ReceptionistRosterModal } from './components/admin/ReceptionistRosterModal';
import { AuthScreen } from './components/auth/AuthScreen';

// New Feature Modals
import { OpdLiveTokenModal } from './components/opd/OpdLiveTokenModal';
import { SpecialistOpdTemplatesModal } from './components/opd/SpecialistOpdTemplatesModal';
import { AiDiagnosisSuggesterModal } from './components/diagnosis/AiDiagnosisSuggesterModal';
import { PharmacyLocatorModal } from './components/pharmacy/PharmacyLocatorModal';
import { MedicineRateComparisonModal } from './components/medicines/MedicineRateComparisonModal';
import { BodyAnatomyViewerModal } from './components/anatomy/BodyAnatomyViewerModal';
import { CarcinogenDatabaseModal } from './components/carcinogens/CarcinogenDatabaseModal';
import { AbhaLinkModal } from './components/abha/AbhaLinkModal';
import { ExternalRecordsModal } from './components/records/ExternalRecordsModal';

const MainAppContent: React.FC = () => {
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const {
    activeTab,
    activeScreen,
    showLocationModal,
    showNotificationsModal,
    selectedPrescription,
    isBookingOpen,
    activeCall,
    showOnboardingModal,
    showReceptionistRosterModal,
    biometricPrompt,
    // New Feature Modal States
    showOpdLiveTokenModal,
    setShowOpdLiveTokenModal,
    showSpecialistOpdTemplatesModal,
    setShowSpecialistOpdTemplatesModal,
    showAiDiagnosisModal,
    setShowAiDiagnosisModal,
    showPharmacyLocatorModal,
    setShowPharmacyLocatorModal,
    showMedicineComparisonModal,
    setShowMedicineComparisonModal,
    showBodyAnatomyModal,
    setShowBodyAnatomyModal,
    showCarcinogenDatabaseModal,
    setShowCarcinogenDatabaseModal,
    showAbhaLinkModal,
    setShowAbhaLinkModal,
    showExternalRecordsModal,
    setShowExternalRecordsModal,
  } = useApp();

  const renderActiveScreen = () => {
    // If a full-screen sub-view is open
    if (activeScreen === 'doctor-profile') {
      return <DoctorProfileScreen />;
    }
    if (activeScreen === 'symptom-checker') {
      return <SymptomCheckerScreen />;
    }
    if (activeScreen === 'hospital-detail') {
      return <HospitalDetailModal />;
    }

    // Otherwise render primary bottom nav tabs
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'find-doctors':
        return <FindDoctorsScreen />;
      case 'consultations':
        return <ConsultationsScreen />;
      case 'appointments':
        return <AppointmentsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const isFullScreenSubView =
    activeScreen === 'doctor-profile' ||
    activeScreen === 'symptom-checker' ||
    activeScreen === 'hospital-detail';

  return (
    <div
      data-color-theme="palette-preview"
      className="min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-between"
    >
      <div className="mx-auto w-full max-w-7xl flex-1">
        {/* Global App Header */}
        {!isFullScreenSubView && <Header onSignIn={() => setShowAuthScreen(true)} />}

        {!isFullScreenSubView && !activeCall.isActive && (
          <div className="sticky top-0 z-30 px-4 pt-2 pb-3 bg-slate-100/90 backdrop-blur-sm">
            <BottomNav />
          </div>
        )}

        {/* Dynamic Screen Content */}
        <main className="px-4 pb-10 md:px-6">
          {renderActiveScreen()}
        </main>

        {/* Global Footer (shown on main screens) */}
        {!isFullScreenSubView && <Footer />}

        {/* Existing Modals & Overlays */}
        {showLocationModal && <LocationModal />}
        {showNotificationsModal && <NotificationsModal />}
        {isBookingOpen && <BookingFlowModal />}
        {selectedPrescription && <DigitalPrescriptionModal />}
        {activeCall.isActive && <VideoRoomModal />}
        {showOnboardingModal && <DoctorOnboardingModal />}
        {showReceptionistRosterModal && <ReceptionistRosterModal />}
        {biometricPrompt && biometricPrompt.isOpen && <BiometricAuthModal />}
        {showAuthScreen && <AuthScreen onDismiss={() => setShowAuthScreen(false)} />}

        {/* Advanced OPD & Health Intelligence Modals */}
        {showOpdLiveTokenModal && (
          <OpdLiveTokenModal onClose={() => setShowOpdLiveTokenModal(false)} />
        )}
        {showSpecialistOpdTemplatesModal && (
          <SpecialistOpdTemplatesModal onClose={() => setShowSpecialistOpdTemplatesModal(false)} />
        )}
        {showAiDiagnosisModal && (
          <AiDiagnosisSuggesterModal onClose={() => setShowAiDiagnosisModal(false)} />
        )}
        {showPharmacyLocatorModal && (
          <PharmacyLocatorModal onClose={() => setShowPharmacyLocatorModal(false)} />
        )}
        {showMedicineComparisonModal && (
          <MedicineRateComparisonModal onClose={() => setShowMedicineComparisonModal(false)} />
        )}
        {showBodyAnatomyModal && (
          <BodyAnatomyViewerModal onClose={() => setShowBodyAnatomyModal(false)} />
        )}
        {showCarcinogenDatabaseModal && (
          <CarcinogenDatabaseModal onClose={() => setShowCarcinogenDatabaseModal(false)} />
        )}
        {showAbhaLinkModal && (
          <AbhaLinkModal onClose={() => setShowAbhaLinkModal(false)} />
        )}
        {showExternalRecordsModal && (
          <ExternalRecordsModal onClose={() => setShowExternalRecordsModal(false)} />
        )}

        {/* System Toast Alerts */}
        <Toast />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
