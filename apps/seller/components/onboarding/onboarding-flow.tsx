"use client";

import { useState } from "react";
import { SellerAppUrls } from "@repo/shared/utils/AppUrls";
import { useRouter } from "next/navigation";
import {
  Badge,
  ShoppingBag,
  Shield,
  Truck,
  Wheat,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
} from "lucide-react";
import { BACKEND_URL } from "@repo/shared/utils/env";
import { CountryCode } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Checkbox,
  Label,
  Input,
  Button,
  Progress,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@repo/shared/ui";
import axios from "axios";

const steps = [
  { id: 1, title: "Welcome", description: "Get started as a seller" },
  { id: 2, title: "Seller Info", description: "Tell us about yourself" },
  { id: 3, title: "Business Details", description: "Your agricultural operation" },
  { id: 4, title: "Products", description: "What you grow and sell" },
  { id: 5, title: "Verification", description: "Upload required documents" },
  { id: 6, title: "Complete", description: "You're all set!" },
];

interface OnboardingFlowCombinedProps {
  access_token: string;
}

export function OnboardingFlow({ access_token }: OnboardingFlowCombinedProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    phone: "",
    // Farm Details
    businessName: "",
    businessDescription: "",
    appartmentNumber: "",
    streetNumber: "",
    streetAddress: "",
    city: "",
    provinceState: "",
    country: "",
    postalCode: "",
    // Products
    primaryCrops: [] as string[],
    seasonalAvailability: "",
    certifications: [] as string[],
    // Verification
    documentsUploaded: false,
  });
  const progress = (currentStep / steps.length) * 100;

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  async function createSellerProfile() {
    console.log(access_token);
    try {
      const api = axios.create({
        baseURL: BACKEND_URL,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const seller_response = await api.post(
        "/profiles/seller/",
        JSON.stringify({
          business_name: formData.businessName,
          contact_person_first_name: formData.firstName,
          contact_person_last_name: formData.lastName,
          phone_number: formData.phone,
          description_of_farm_business: formData.businessDescription,
        }),
      );
      console.log(seller_response);

      const address_json = {
        address_type: "BUSINESS",
        street_number: formData.streetNumber,
        street_address: formData.streetAddress,
        appartment_unit: formData.appartmentNumber,
        city: formData.city,
        province_state: formData.provinceState,
        postal_code: formData.postalCode,
        country: formData.country,
      };
      console.log(address_json);
      const address_response = await api.post("/profiles/addresses/", JSON.stringify(address_json));
      console.log(address_response);

      const users_response = await api.patch(
        "/profiles/users/",
        JSON.stringify({
          is_seller_onboarding_complete: true,
        }),
      );
      console.log(users_response);
    } catch (error) {
      console.error("Fetch failed", error);
      return null;
    }
    router.push(SellerAppUrls.myAccount);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <ShoppingBag className="h-6 w-6 text-[#075b23]" />
            <span className="text-[#075b23]">Afre</span>
            <span className="text-sm font-normal text-muted-foreground">for Sellers</span>
          </div>
          <Badge variant="secondary" className="text-sm">
            Step {currentStep} of {steps.length}
          </Badge>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 max-w-4x1">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl text-afre font-bold text-foreground">Seller Onboarding</h1>
            <span className="text-sm text-afre text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2 text-afre" />

          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id < currentStep
                      ? "bg-afre text-primary-foreground"
                      : step.id === currentStep
                        ? "bg-afre text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <span className="text-xs text-muted-foreground mt-1 text-center max-w-16">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-balance">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription className="text-lg">
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Welcome */}
            {currentStep === 1 && (
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-balance">
                    Welcome to Afre Marketplace
                  </h3>
                  <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
                    Join thousands of agricultural producers who are connecting directly with
                    buyers, getting fair prices for their crops, and growing their business through
                    our platform.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium">Secure Trading</h4>
                    <p className="text-sm text-muted-foreground">Protected transactions</p>
                  </div>
                  <div className="text-center p-4">
                    <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium">Logistics Support</h4>
                    <p className="text-sm text-muted-foreground">Delivery coordination</p>
                  </div>
                  <div className="text-center p-4">
                    <Wheat className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium">Quality Assurance</h4>
                    <p className="text-sm text-muted-foreground">Verified products</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Basic Info */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Farm Details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Farm/Business Name</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => updateFormData("businessName", e.target.value)}
                    placeholder="Green Valley Farms"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessDescription">Business Describe</Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => updateFormData("businessDescription", e.target.value)}
                    placeholder="Describe you business and the products you are interested in selling"
                    rows={3}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appartmentNumber">Appartment Number</Label>
                    <Input
                      id="appartmentNumber"
                      value={formData.appartmentNumber}
                      onChange={(e) => updateFormData("appartmentNumber", e.target.value)}
                      placeholder="01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="streetNumber">Street Number</Label>
                    <Input
                      id="streetNumber"
                      value={formData.streetNumber}
                      onChange={(e) => updateFormData("streetNumber", e.target.value)}
                      placeholder="01"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    value={formData.streetAddress}
                    onChange={(e) => updateFormData("streetAddress", e.target.value)}
                    placeholder="Street Address"
                  />
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provinceState">Province or State</Label>
                    <Input
                      id="provinceState"
                      value={formData.provinceState}
                      onChange={(e) => updateFormData("provinceState", e.target.value)}
                      placeholder="Province or State"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value: CountryCode) =>
                        setFormData({ ...formData, country: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(CountryCode).map((country_code) => (
                          <SelectItem key={country_code} value={country_code}>
                            {country_code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => updateFormData("postalCode", e.target.value)}
                      placeholder="Postal Code"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Products */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Primary Crops (select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Cocoa", "Coffee"].map((crop) => (
                      <div key={crop} className="flex items-center space-x-2">
                        <Checkbox
                          id={crop}
                          checked={formData.primaryCrops.includes(crop)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData("primaryCrops", [...formData.primaryCrops, crop]);
                            } else {
                              updateFormData(
                                "primaryCrops",
                                formData.primaryCrops.filter((c) => c !== crop),
                              );
                            }
                          }}
                        />
                        <Label htmlFor={crop} className="text-sm">
                          {crop}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seasonalAvailability">Seasonal Availability</Label>
                  <Textarea
                    id="seasonalAvailability"
                    value={formData.seasonalAvailability}
                    onChange={(e) => updateFormData("seasonalAvailability", e.target.value)}
                    placeholder="Describe when your products are typically available (e.g., Spring wheat harvest in July-August, vegetables year-round in greenhouse)"
                    rows={3}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Certifications (if applicable)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["USDA Organic", "Fair Trade", "Non-GMO", "Rainforest Alliance"].map(
                      (cert) => (
                        <div key={cert} className="flex items-center space-x-2">
                          <Checkbox
                            id={cert}
                            checked={formData.certifications.includes(cert)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateFormData("certifications", [
                                  ...formData.certifications,
                                  cert,
                                ]);
                              } else {
                                updateFormData(
                                  "certifications",
                                  formData.certifications.filter((c) => c !== cert),
                                );
                              }
                            }}
                          />
                          <Label htmlFor={cert} className="text-sm">
                            {cert}
                          </Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Verification */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <Upload className="w-16 h-16 text-primary mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">Document Verification</h3>
                    <p className="text-muted-foreground">
                      Please upload the following documents to verify your farm and identity
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Farm Registration/License</p>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG (max 5MB)</p>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Government ID</p>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG (max 5MB)</p>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">Certification Documents (Optional)</p>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG (max 5MB each)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="documentsUploaded"
                    checked={formData.documentsUploaded}
                    onCheckedChange={(checked) => updateFormData("documentsUploaded", checked)}
                  />
                  <Label htmlFor="documentsUploaded" className="text-sm">
                    I confirm that all uploaded documents are authentic and current
                  </Label>
                </div>
              </div>
            )}

            {/* Step 6: Complete */}
            {currentStep === 6 && (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-balance">
                    Welcome to Afre, {formData.firstName}!
                  </h3>
                  <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
                    Your seller account has been created successfully. Our team will review your
                    documents within 24-48 hours and notify you once your account is fully verified.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <h4 className="font-semibold">What happens next?</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>✓ Document verification (24-48 hours)</p>
                    <p>✓ Account activation email</p>
                    <p>✓ Access to seller dashboard</p>
                    <p>✓ Start listing your products</p>
                  </div>
                </div>
                <Button
                  onClick={createSellerProfile}
                  size="lg"
                  className="w-full md:w-auto bg-afre"
                >
                  Go to Dashboard
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 7 && (
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 bg-transparent text-afre"
                >
                  <ArrowLeft className="w-4 h-4 text-afre" />
                  Previous
                </Button>
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-afre"
                  disabled={currentStep === 6}
                >
                  {currentStep === 5 ? "Complete Setup" : "Continue"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
