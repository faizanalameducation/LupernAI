import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
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
    try {
        const client = await clientPromise;
        const db = client.db('lupern');
        const project = await db.collection('projects').findOne({ _id: new ObjectId(params.projectId) });

        if (!project) {
            return {
                title: 'Project Not Found',
            };
        }

        return {
            title: `${project.content.hero_headline} - Preview`,
            description: project.content.seo_meta_description,
        };
    } catch {
        return {
            title: 'Project Not Found',
        };
    }
}

export default async function PreviewPage({ params }: PreviewPageProps) {
    try {
        const client = await clientPromise;
        const db = client.db('lupern');
        const project = await db.collection('projects').findOne({ _id: new ObjectId(params.projectId) });

        if (!project) {
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
    } catch {
        notFound();
    }
}
