export interface ChipOption {
    id: string;
    text: string;
}

export interface ServiceOption {
    id: string;
    text: string;
    services: ChipOption[];
}

export class FormViewModel {
    private _selectedBranding: string | null = null;
    private _selectedServices: string[] = [];
    private _isSecondRowVisible = false;

    // Данные для первого ряда (брендинг)
    readonly brandingOptions: ChipOption[] = [
        { id: "corporate", text: "Corporate" },
        { id: "product", text: "Product" },
        { id: "campaign", text: "Campaign" },
        { id: "personal", text: "Personal" },
        { id: "support", text: "Support" },
    ];

    private readonly serviceOptionsMap: Record<string, ChipOption[]> = {
        corporate: [
            { id: "naming", text: "Naming" },
            { id: "logo", text: "Logo" },
            { id: "brand-guidelines", text: "Brand Guidelines" },
            { id: "ui-ux", text: "UI/UX" },
            { id: "key-visual", text: "Key Visual" },
            { id: "content-design", text: "Content Design" },
        ],
        product: [
            { id: "naming", text: "Naming" },
            { id: "logo", text: "Logo" },
            { id: "packaging", text: "Packaging" },
            { id: "brand-guidelines", text: "Brand Guidelines" },
            { id: "ui-ux", text: "UI/UX" },
            { id: "key-visual", text: "Key Visual" },
            { id: "content-design", text: "Content Design" },
        ],
        campaign: [
            { id: "naming", text: "Naming" },
            { id: "logo", text: "Logo" },
            { id: "brand-guidelines", text: "Brand Guidelines" },
            { id: "ui-ux", text: "UI/UX" },
            { id: "key-visual", text: "Key Visual" },
            { id: "content-design", text: "Content Design" },
        ],
        personal: [
            { id: "logo", text: "Logo" },
            { id: "brand-guidelines", text: "Brand Guidelines" },
            { id: "ui-ux", text: "UI/UX" },
            { id: "key-visual", text: "Key Visual" },
            { id: "content-design", text: "Content Design" },
        ],
        support: [
            { id: "rebranding", text: "Rebranding" },
            { id: "re-styling", text: "Re-styling" },
            { id: "ui-ux", text: "UI/UX" },
            { id: "key-visual", text: "Key Visual" },
            { id: "content-design", text: "Content Design" },
        ],
    };

    // Геттеры
    get selectedBranding(): string | null {
        return this._selectedBranding;
    }

    get selectedServices(): string[] {
        return this._selectedServices;
    }

    get isSecondRowVisible(): boolean {
        return this._isSecondRowVisible;
    }

    get currentServiceOptions(): ChipOption[] {
        if (!this._selectedBranding) return [];
        return this.serviceOptionsMap[this._selectedBranding] || [];
    }
    onClose(): void {
        this.clearSelection();
    }
    // Методы
    selectBranding(brandingId: string): void {
        if (this._selectedBranding === brandingId) {
            this.clearSelection();
            return; // ← Выходим из метода, не устанавливаем новый выбор
        }

        this._selectedBranding = brandingId;
        this._selectedServices = [];
        this._isSecondRowVisible = true;
    }

    toggleService(serviceId: string): void {
        const index = this._selectedServices.indexOf(serviceId);
        if (index > -1) {
            this._selectedServices.splice(index, 1);
        } else {
            this._selectedServices.push(serviceId);
        }
    }

    clearSelection(): void {
        this._selectedBranding = null;
        this._selectedServices = [];
        this._isSecondRowVisible = false;
    }

    // Получить данные для отправки формы
    getFormData() {
        return {
            branding: this._selectedBranding,
            services: this._selectedServices,
        };
    }
} 