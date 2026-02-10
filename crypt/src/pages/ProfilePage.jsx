import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useUI } from "../context/UIContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { User, Bell, Shield, LogOut, Settings, ChevronDown } from "lucide-react";
import { translations } from "../lib/translations";

export function ProfilePage() {
    const { language, setLanguage, t } = useLanguage();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Profile');
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

    const handleSignOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const getLangKey = (code) => {
        const map = {
            'en': 'english', 'hi': 'hindi', 'bn': 'bengali', 'te': 'telugu',
            'mr': 'marathi', 'ta': 'tamil', 'ur': 'urdu', 'gu': 'gujarati',
            'kn': 'kannada', 'ml': 'malayalam', 'pa': 'punjabi', 'or': 'odia',
            'as': 'assamese', 'es': 'spanish', 'fr': 'french', 'de': 'german',
            'zh': 'chinese', 'ja': 'japanese', 'ru': 'russian', 'ar': 'arabic',
            'pt': 'portuguese'
        };
        return map[code] || 'english';
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8 pb-12 relative">
            <h1 className="text-3xl font-semibold text-foreground">{t('profile.settings')}</h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                {/* Sidebar Navigation */}
                <div className="md:col-span-4 space-y-2">
                    {['Profile', 'Notifications', 'Security', 'Settings'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === item
                                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                : 'text-foreground-muted hover:bg-white/5 hover:text-foreground'
                                }`}
                        >
                            {item === 'Profile' && <><User className="h-4 w-4" />{t('nav.profile')}</>}
                            {item === 'Notifications' && <><Bell className="h-4 w-4" />{t('profile.notifications')}</>}
                            {item === 'Security' && <><Shield className="h-4 w-4" />{t('profile.security')}</>}
                            {item === 'Settings' && <><Settings className="h-4 w-4" />{t('profile.settings')}</>}
                        </button>
                    ))}

                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all mt-4 border border-red-400/10"
                    >
                        <LogOut className="h-4 w-4" />
                        {t('profile.signOut')}
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-8 space-y-6">
                    {activeTab === 'Security' ? (
                        <Card className="p-8 space-y-8">
                            <div>
                                <h2 className="text-xl font-medium text-foreground">Security Settings</h2>
                                <p className="text-foreground-muted">Manage your account security preferences</p>
                            </div>

                            {/* Change Password */}
                            <div className="space-y-4">
                                <h3 className="text-base font-medium text-foreground">Change Password</h3>
                                <div className="grid grid-cols-1 gap-4 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-foreground-subtle uppercase">Current Password</label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-foreground-subtle uppercase">New Password</label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-foreground-subtle uppercase">Confirm New Password</label>
                                        <Input type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                                            Forgot Password?
                                        </Link>
                                        <Button size="sm">Update Password</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ) : activeTab === 'Notifications' ? (
                        <Card className="p-8 space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground">Notification Settings</h2>
                                <p className="text-foreground-muted">Choose how you want to be notified</p>
                            </div>
                            <p className="text-foreground-muted">Notification preferences coming soon.</p>
                        </Card>
                    ) : activeTab === 'Settings' ? (
                        <Card className="p-8 space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground">App Settings</h2>
                                <p className="text-foreground-muted">Customize your experience</p>
                            </div>
                            <p className="text-foreground-muted">More settings coming soon.</p>
                        </Card>
                    ) : (
                        <>
                            <Card className="p-8 space-y-8">
                                {/* Profile Pic Section */}
                                <div className="flex items-center space-x-6">
                                    <div className="h-24 w-24 rounded-full bg-accent/20 flex items-center justify-center text-4xl border-2 border-accent/50 overflow-hidden relative group">
                                        <User className="h-10 w-10 text-accent" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-foreground">John Doe</h3>
                                        <p className="text-foreground-muted">Professor of Physics</p>
                                        <Button variant="secondary" size="sm" className="mt-3">{t('profile.changeAvatar')}</Button>
                                    </div>
                                    <div className="flex flex-col items-end justify-center">
                                        <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-medium">
                                            {t('profile.active')}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Personal Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-mono text-foreground-subtle uppercase">{t('profile.firstName')}</label>
                                            <Input defaultValue="John Doe" placeholder={t('profile.firstName')} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-mono text-foreground-subtle uppercase">{t('profile.preferredName')}</label>
                                            <Input defaultValue="Johnny" placeholder={t('profile.preferredName')} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-mono text-foreground-subtle uppercase">{t('profile.age')}</label>
                                            <Input type="number" defaultValue="35" placeholder={t('profile.age')} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-mono text-foreground-subtle uppercase">{t('profile.gender')}</label>
                                            <select className="flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-white border-black/10 text-foreground focus-visible:ring-accent/50 shadow-sm dark:bg-[#0F0F12] dark:border-white/10 dark:text-foreground">
                                                <option value="" disabled>Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="non-binary">Non-binary</option>
                                                <option value="prefer-not-to-say">Prefer not to say</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-mono text-foreground-subtle uppercase">{t('profile.location')}</label>
                                            <Input defaultValue="Cambridge, MA" placeholder={t('profile.location')} />
                                        </div>
                                    </div>

                                    {/* Preferences */}
                                    <div className="pt-4 border-t border-white/5">
                                        <h4 className="text-sm font-medium text-foreground mb-4">Preferences</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-mono text-foreground-subtle uppercase">{t('profile.language')}</label>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                                        className="flex h-10 w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors bg-white border-black/10 text-foreground shadow-sm dark:bg-[#0F0F12] dark:border-white/10 dark:text-foreground"
                                                    >
                                                        {t(`${getLangKey(language)}`)}
                                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                                    </button>

                                                    {isLangDropdownOpen && (
                                                        <div className="absolute z-50 mt-1 w-full rounded-md border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-[#0F0F12] max-h-[220px] overflow-y-auto">
                                                            <div className="p-1">
                                                                {Object.keys(translations).map((lang) => (
                                                                    <button
                                                                        key={lang}
                                                                        onClick={() => {
                                                                            setLanguage(lang);
                                                                            setIsLangDropdownOpen(false);
                                                                        }}
                                                                        className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors hover:bg-accent/10 hover:text-accent ${language === lang ? 'bg-accent/10 text-accent' : 'text-foreground'}`}
                                                                    >
                                                                        {t(`${getLangKey(lang)}`)}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-mono text-foreground-subtle uppercase">{t('profile.tone')}</label>
                                                <select className="flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-colors bg-white border-black/10 text-foreground shadow-sm dark:bg-[#0F0F12] dark:border-white/10 dark:text-foreground">
                                                    <option value="professional">Professional</option>
                                                    <option value="casual">Casual</option>
                                                    <option value="friendly">Friendly</option>
                                                    <option value="concise">Concise</option>
                                                    <option value="explanatory">Explanatory</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-foreground-subtle uppercase">{t('profile.email')}</label>
                                        <Input defaultValue="john.doe@university.edu" disabled className="opacity-75 cursor-not-allowed" />
                                    </div>

                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button>{t('profile.saveChanges')}</Button>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-foreground">{t('profile.subscription')}</h3>
                                        <p className="text-foreground-muted mt-1">You are currently on the <span className="text-accent font-semibold">Pro Academic</span> plan.</p>
                                    </div>
                                </div>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
