"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Compass, CheckCircle2, Sparkles, ArrowRight, ArrowLeft, ShieldCheck, Cpu, Code2, Users, Calendar, DollarSign, Target, AlertCircle, Plus, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useProfile } from "@/context/ProfileContext";
import { StudentProfileInput, DEFAULT_DEMO_PROFILE_INPUT, SKILL_CATEGORIES } from "@/lib/validation/profile";

const AVAILABLE_DOMAINS = [
  "Healthcare AI", "FinTech & Banking", "EdTech Platform", "Cybersecurity", 
  "Predictive Analytics", "Full-Stack Web SaaS", "E-commerce AI", "DevOps & Cloud"
];

export function OnboardingWizard() {
  const router = useRouter();
  const { profile, saveProfile, loadDemoProfile, saving, error } = useProfile();
  const [step, setStep] = useState<number>(1);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Custom skill input state
  const [customSkillInput, setCustomSkillInput] = useState("");

  // Local form state
  const [formData, setFormData] = useState<StudentProfileInput>(
    profile || DEFAULT_DEMO_PROFILE_INPUT
  );

  const handleFillDemo = () => {
    setFormData(DEFAULT_DEMO_PROFILE_INPUT);
    loadDemoProfile();
    setValidationErrors({});
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
      };
    });
  };

  const handleResetSkills = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [],
    }));
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (!trimmed) return;

    if (!formData.skills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
    }
    setCustomSkillInput("");
  };

  const toggleDomain = (domain: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(domain);
      return {
        ...prev,
        interests: exists ? prev.interests.filter((d) => d !== domain) : [...prev.interests, domain],
      };
    });
  };

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.field.trim()) errors.field = "Field of study is required";
      if (!formData.degree.trim()) errors.degree = "Degree and year are required";
      if (formData.skills.length === 0) errors.skills = "Select at least one skill/language";
    } else if (step === 2) {
      if (formData.interests.length === 0) errors.interests = "Select at least one domain interest";
      if (!formData.career_goal.trim()) errors.career_goal = "Career goal is required";
    } else if (step === 3) {
      if (formData.team_size < 1) errors.team_size = "Team size must be at least 1";
      if (formData.timeline_months < 1) errors.timeline_months = "Timeline must be at least 1 month";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    const success = await saveProfile(formData);
    if (success) {
      router.push("/projects");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Demo Quick-Fill */}
      <div className="p-4 rounded-xl bg-[#111726] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>Student Profile & Skill Constraints Architect</span>
              <Badge variant="brand">Zod Validated</Badge>
            </div>
            <div className="text-xs text-slate-400">
              Your selected skills directly drive the dynamic AI candidate generation engine.
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="rescue"
          size="sm"
          onClick={handleFillDemo}
          className="shrink-0 gap-1.5 text-xs font-bold"
        >
          <Sparkles className="h-3.5 w-3.5 fill-current" />
          <span>⚡ Auto-Fill Demo Profile</span>
        </Button>
      </div>

      {/* Stepper Progress Indicator */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { num: 1, label: "Academic & Skills" },
          { num: 2, label: "Domain & Career Goal" },
          { num: 3, label: "Team & Constraints" },
          { num: 4, label: "Review & Save" },
        ].map((s) => (
          <div
            key={s.num}
            onClick={() => setStep(s.num)}
            className={`p-2.5 rounded-lg border font-medium cursor-pointer transition-all ${
              step === s.num
                ? "bg-slate-800 text-cyan-300 border-slate-700 font-bold"
                : step > s.num
                  ? "bg-[#111726] text-emerald-400 border-emerald-500/30"
                  : "bg-[#111726]/60 text-slate-500 border-slate-800"
            }`}
          >
            <div className="font-mono text-[10px] font-bold">STEP 0{s.num}</div>
            <div className="truncate text-slate-200 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Step Content Card */}
      <Card className="bg-[#111726] border-slate-800">
        <CardContent className="p-6 sm:p-8 space-y-6">
          
          {/* Global error alert */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Academic & Skills */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-cyan-400" />
                  <span>Academic Background & Technical Skills Catalog</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Select your programming languages, web frameworks, ML tools, and databases.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Field of Study</label>
                  <input
                    type="text"
                    value={formData.field}
                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                    placeholder="e.g. Computer Science & Artificial Intelligence"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                  />
                  {validationErrors.field && <span className="text-[11px] text-red-400 mt-1 block">{validationErrors.field}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Degree & Year/Semester</label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    placeholder="e.g. B.Tech CS — 7th Semester (Final Year)"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                  />
                  {validationErrors.degree && <span className="text-[11px] text-red-400 mt-1 block">{validationErrors.degree}</span>}
                </div>
              </div>

              {/* Selected Skills Tags Header */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">Selected Skills ({formData.skills.length})</span>
                  
                  {formData.skills.length > 0 && (
                    <button
                      type="button"
                      onClick={handleResetSkills}
                      className="text-[11px] font-semibold text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-red-500/10"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset Skills</span>
                    </button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-pointer hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40 transition-colors flex items-center gap-1"
                    >
                      <span>{skill}</span>
                      <X className="h-3 w-3" />
                    </span>
                  ))}
                  {formData.skills.length === 0 && (
                    <span className="text-xs text-slate-500 italic">No skills selected. Select skills from catalog below or add a custom skill.</span>
                  )}
                </div>
              </div>

              {/* Add Custom Skill Tag Input */}
              <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  placeholder="Type any custom skill (e.g. Assembly, Spring Cloud, TensorRT, Solidity)..."
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
                />
                <Button type="submit" variant="secondary" size="sm" className="gap-1 text-xs shrink-0">
                  <Plus className="h-4 w-4" />
                  <span>Add Custom Skill</span>
                </Button>
              </form>

              {/* Categorized Full Skills Catalog */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider">
                  <span>Categorized Skills Catalog</span>
                  {formData.skills.length > 0 && (
                    <button
                      type="button"
                      onClick={handleResetSkills}
                      className="text-[11px] font-medium text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Clear All Selection</span>
                    </button>
                  )}
                </div>
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.category} className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400">{cat.category}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => {
                        const isSelected = formData.skills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                              isSelected
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold"
                                : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
                            }`}
                          >
                            {isSelected ? "✓ " : "+ "}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Domain & Career Goal */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-400" />
                  <span>Domain Interests & Target Career Goal</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Help AI align candidate projects with your career vision.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Role / Career Goal</label>
                <input
                  type="text"
                  value={formData.career_goal}
                  onChange={(e) => setFormData({ ...formData, career_goal: e.target.value })}
                  placeholder="e.g. AI/ML Software Engineer, Java Backend Developer"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
                {validationErrors.career_goal && <span className="text-[11px] text-red-400 mt-1 block">{validationErrors.career_goal}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Industry & Domain Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_DOMAINS.map((domain) => {
                    const isSelected = formData.interests.includes(domain);
                    return (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => toggleDomain(domain)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          isSelected
                            ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50 shadow-sm"
                            : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                        }`}
                      >
                        {isSelected && "✓ "}
                        {domain}
                      </button>
                    );
                  })}
                </div>
                {validationErrors.interests && <span className="text-[11px] text-red-400 mt-1 block">{validationErrors.interests}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="col-span-full text-xs font-semibold text-slate-300">Prior Project Experience Level</div>
                {[
                  { id: "beginner" as const, title: "Beginner", desc: "First major project / Basic coding" },
                  { id: "intermediate" as const, title: "Intermediate", desc: "Built web apps, REST APIs & scripts" },
                  { id: "advanced" as const, title: "Advanced", desc: "Full-stack architectures & custom models" },
                ].map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => setFormData({ ...formData, experience: exp.id })}
                    className={`p-3 rounded-lg border cursor-pointer text-xs transition-all ${
                      formData.experience === exp.id
                        ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-semibold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-white">{exp.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{exp.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Team, Timeline & Constraints */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <span>Team Size, Timeline & Hardware Constraints</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Realistic constraints prevent scope explosion before coding starts.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Team Members</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={formData.team_size}
                    onChange={(e) => setFormData({ ...formData, team_size: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Timeline Duration (Months)</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={formData.timeline_months}
                    onChange={(e) => setFormData({ ...formData, timeline_months: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Available Budget</label>
                  <div className="space-y-2 text-xs">
                    {[
                      { id: "free" as const, label: "Free Tier Only ($0)" },
                      { id: "low" as const, label: "Low ($20-$50 for domain/hosting)" },
                      { id: "medium" as const, label: "Medium ($100-$200 Cloud GPU)" },
                    ].map((b) => (
                      <div
                        key={b.id}
                        onClick={() => setFormData({ ...formData, budget: b.id })}
                        className={`p-2.5 rounded-lg border cursor-pointer ${
                          formData.budget === b.id ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300" : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        {b.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Compute & Hardware</label>
                  <div className="space-y-2 text-xs">
                    {[
                      { id: "standard_laptop" as const, label: "Standard Laptop (16GB RAM, No GPU)" },
                      { id: "gpu_laptop" as const, label: "Workstation / Gaming GPU Laptop" },
                      { id: "cloud_credits" as const, label: "Cloud Credits (Colab / Kaggle / AWS)" },
                    ].map((h) => (
                      <div
                        key={h.id}
                        onClick={() => setFormData({ ...formData, hardware: h.id })}
                        className={`p-2.5 rounded-lg border cursor-pointer ${
                          formData.hardware === h.id ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-300" : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}
                      >
                        {h.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Save */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <span>Review Profile & Verify Skill Alignment</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Ready to save student profile and generate project candidates tailored to your skills.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Field & Degree:</span>
                  <span className="font-semibold text-white">{formData.field} ({formData.degree})</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Selected Skills ({formData.skills.length}):</span>
                  <span className="font-mono text-cyan-400">{formData.skills.join(", ")}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Career Goal:</span>
                  <span className="font-semibold text-indigo-400">{formData.career_goal}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Team & Duration:</span>
                  <span className="font-mono text-emerald-400">{formData.team_size} Members | {formData.timeline_months} Months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hardware & Budget:</span>
                  <span className="text-slate-300 font-mono">{formData.hardware} | {formData.budget}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Zod schema validation passed! Project candidates will be generated using {formData.skills.join(", ")}.</span>
              </div>
            </div>
          )}

        </CardContent>

        {/* Card Footer Controls */}
        <CardFooter className="flex justify-between border-t border-slate-800/80 pt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBack}
            disabled={step === 1}
            className="gap-1 text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </Button>

          {step < 4 ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleNext}
              className="gap-1.5 text-xs font-semibold"
            >
              <span>Next Step</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              type="button"
              variant="rescue"
              size="md"
              disabled={saving}
              onClick={handleSubmit}
              className="gap-2 text-xs font-bold"
            >
              <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
              <span>{saving ? "Saving Profile..." : "Save Profile & Generate Skill-Based Candidates"}</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
