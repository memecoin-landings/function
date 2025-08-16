export interface ChipOption {
    id: string;
    text: string;
}

export interface ServiceOption {
    id: string;
    text: string;
    services: ChipOption[];
}

export interface IFormViewModel {
    readonly brandingOptions: ChipOption[];
    readonly selectedBranding: string | null;
    readonly selectedServices: string[];
    readonly isSecondRowVisible: boolean;
    readonly isButtonActive: boolean;
    readonly currentServiceOptions: ChipOption[];
    
    selectBranding(brandingId: string): void;
    toggleService(serviceId: string): void;
    clearSelection(): void;
    onClose(): void;
    getFormData(): { branding: string | null; services: string[] };
} 