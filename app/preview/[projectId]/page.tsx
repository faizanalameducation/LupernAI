import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PreviewWrapper from '@/components/PreviewWrapper';
import ModernLayout from '@/components/layouts/ModernLayout';
import MinimalLayout from '@/components/layouts/MinimalLayout';
import BoldLayout from '@/components/layouts/BoldLayout';

interface PreviewPageProps {
    params: {
        projectId: string;
    };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
    const { data: project } = await supabase
        .from('projects')
        .select('content')
        .eq('id', params.projectId)
        .single();

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.content.hero_headline} - Preview`,
        description: project.content.seo_meta_description,
    };
}

export default async function PreviewPage({ params }: PreviewPageProps) {
    const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.projectId)
        .single();

    if (error || !project) {
        notFound();
    }

    const { content, layout, industry, audience, business_name, color_theme, mode } = project;

    const renderLayout = () => {
        switch (layout) {
            case 'Minimal':
                return <MinimalLayout content={content} industry={industry} audience={audience} color_theme={color_theme} mode={mode} />;
            case 'Bold':
                return <BoldLayout content={content} industry={industry} audience={audience} color_theme={color_theme} mode={mode} />;
            case 'Modern':
            default:
                return <ModernLayout content={content} industry={industry} audience={audience} color_theme={color_theme} mode={mode} />;
        }
    };

    const siteUrl = `https://${business_name.toLowerCase().replace(/\s+/g, '')}.com`;

    return (
        <PreviewWrapper siteUrl={siteUrl}>
            {renderLayout()}
        </PreviewWrapper>
    );
}
