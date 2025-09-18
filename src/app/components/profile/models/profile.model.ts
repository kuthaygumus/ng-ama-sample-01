export interface ProfileContainerData {
  fullName: string;
  email: string;
  status: string;
  miles: number;
  isAuthenticated: boolean;
}

export interface DetailedProfileData extends ProfileContainerData {
  // Kişisel Bilgiler
  phoneNumber?: string;
  birthDate?: Date;
  nationality?: string;
  passportNumber?: string;
  passportExpiry?: Date;

  // Adres Bilgileri
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  // Ödeme Bilgileri
  paymentMethods?: PaymentMethod[];

  // Üyelik Bilgileri
  memberSince?: Date;
  statusExpiryDate?: Date;
  statusProgress?: number; // Bir sonraki statüye yükselmek için gerekli olan mil yüzdesi (0-100)
  nextStatus?: string; // Bir sonraki yükselebileceği statü
  milesNeededForNextStatus?: number; // Bir sonraki statüye yükselmek için gereken mil sayısı

  // Mil Geçmişi Özeti
  milesEarnedThisYear?: number;
  milesSpentThisYear?: number;
  milesExpiringThisYear?: number;

  // Uçuş Tercihleri
  preferences?: {
    seatType?: 'window' | 'aisle' | 'middle';
    mealPreference?: string;
    specialAssistance?: boolean;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  cardNumber: string; // Maskelenmiş (örneğin: **** **** **** 1234)
  cardHolder: string;
  expiryDate: string; // MM/YY formatında
  isDefault: boolean;
}
