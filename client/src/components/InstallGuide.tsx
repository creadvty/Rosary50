import React, { useState } from 'react';
import { Share, Ellipsis, EllipsisVertical, Copy, Check, X } from 'lucide-react';
import type { InstallGuideKind } from '@/hooks/usePWAInstall';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Icon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center justify-center align-[-0.15em] mx-0.5 text-primary">{children}</span>
);

const B: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-bold">{children}</span>
);

const CopyLinkButton: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText('https://rosary50.com');
      setCopied(true);
    } catch {
      // Clipboard not allowed here; the link is printed on screen instead
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-semibold uppercase tracking-widest text-primary bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Link copied' : 'Copy link'}
    </button>
  );
};

const GUIDES: Record<InstallGuideKind, { title: string; steps: React.ReactNode[]; note?: React.ReactNode }> = {
  ios_safari: {
    title: 'Add to Home Screen',
    steps: [
      <>
        Tap <B>Share</B>{' '}
        <Icon>
          <Share className="w-5 h-5" />
        </Icon>
        . If you don't see it, tap{' '}
        <Icon>
          <Ellipsis className="w-5 h-5" />
        </Icon>{' '}
        first.
      </>,
      <>
        Scroll down and tap <B>Add to Home Screen</B>.
      </>,
      <>
        Tap <B>Add</B>.
      </>,
    ],
    note: 'Rosary50 will then open full-screen from its own icon, just like an app.',
  },
  ios_other: {
    title: 'Add to Home Screen',
    steps: [
      <>
        Tap your browser's <B>Share</B> button{' '}
        <Icon>
          <Share className="w-5 h-5" />
        </Icon>
        .
      </>,
      <>
        Tap <B>Add to Home Screen</B>, then <B>Add</B>.
      </>,
    ],
    note: (
      <>
        Not listed? Open <B>rosary50.com</B> in Safari and try there.
      </>
    ),
  },
  android: {
    title: 'Add to Home Screen',
    steps: [
      <>
        Open your browser's menu{' '}
        <Icon>
          <EllipsisVertical className="w-5 h-5" />
        </Icon>{' '}
        (top right, or at the bottom in some browsers).
      </>,
      <>
        Tap <B>Add to Home screen</B> or <B>Install app</B>.
      </>,
    ],
    note: 'If Rosary50 is already on your home screen, you are all set.',
  },
  mac_safari: {
    title: 'Add to Dock',
    steps: [
      <>
        In the menu bar, choose <B>File</B>, then <B>Add to Dock</B>.
      </>,
    ],
  },
  inapp: {
    title: 'Open in Your Browser First',
    steps: [
      <>
        Tap this app's menu{' '}
        <Icon>
          <Ellipsis className="w-5 h-5" />
        </Icon>{' '}
        or{' '}
        <Icon>
          <EllipsisVertical className="w-5 h-5" />
        </Icon>
        .
      </>,
      <>
        Choose <B>Open in Safari</B>, <B>Open in Chrome</B>, or <B>Open in browser</B>.
      </>,
      <>
        Then tap <B>Add to Home Screen</B> again from there.
      </>,
    ],
    note: (
      <>
        This page is open inside another app, which can't add it to your home screen. No menu option? Copy the
        link and paste it into Safari or Chrome.
        <br />
        <CopyLinkButton />
      </>
    ),
  },
};

// Title + numbered steps. Must be placed inside an AlertDialogContent.
export const InstallSteps: React.FC<{ kind: InstallGuideKind }> = ({ kind }) => {
  const guide = GUIDES[kind];
  return (
    <AlertDialogHeader>
      <AlertDialogTitle className="font-serif text-2xl text-primary">{guide.title}</AlertDialogTitle>
      <AlertDialogDescription asChild className="text-lg leading-relaxed text-primary/80 font-serif text-left">
        <div>
          <ol className="list-decimal pl-6 space-y-2 marker:font-sans marker:text-sm marker:text-primary/60">
            {guide.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          {guide.note && <div className="mt-4 text-base text-primary/70">{guide.note}</div>}
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
  );
};

// Stand-alone pop-up version, used by the button on the opening Crucifix
export const InstallGuideDialog: React.FC<{
  kind: InstallGuideKind | null;
  onClose: () => void;
  onDone: () => void;
}> = ({ kind, onClose, onDone }) => (
  <AlertDialog open={kind !== null} onOpenChange={(open) => !open && onClose()}>
    <AlertDialogContent className="bg-[#fdfbf7] border-stone-200">
      <div className="absolute right-4 top-4">
        <button
          onClick={onClose}
          className="text-primary/40 hover:text-primary transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      {kind && <InstallSteps kind={kind} />}
      <AlertDialogFooter>
        <AlertDialogAction
          onClick={onDone}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans uppercase tracking-widest flex items-center gap-2"
        >
          <Check className="h-4 w-4" /> Done
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
