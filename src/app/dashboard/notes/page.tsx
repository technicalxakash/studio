'use client';

import { useState } from 'react';
import { useAuth, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { collection, query, where, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function NotesPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const notesQuery = useMemoFirebase(() => {
    if (!auth.currentUser) return null;
    return query(collection(firestore, 'notes'), where('userId', '==', auth.currentUser.uid));
  }, [firestore, auth.currentUser]);

  const { data: notes, isLoading } = useCollection(notesQuery);

  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<{ id?: string; title: string; content: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenNoteDialog = (note: { id?: string; title: string; content: string } | null = null) => {
    setCurrentNote(note || { title: '', content: '' });
    setIsNoteDialogOpen(true);
  };

  const handleSaveNote = async () => {
    if (!currentNote || !auth.currentUser) return;
    setIsSubmitting(true);
    
    const noteData = {
      ...currentNote,
      userId: auth.currentUser.uid,
      updatedAt: serverTimestamp(),
    };

    try {
      if (currentNote.id) {
        const noteRef = doc(firestore, 'notes', currentNote.id);
        updateDocumentNonBlocking(noteRef, noteData);
        toast({ title: 'Note updated successfully' });
      } else {
        const colRef = collection(firestore, 'notes');
        addDocumentNonBlocking(colRef, { ...noteData, createdAt: serverTimestamp() });
        toast({ title: 'Note created successfully' });
      }
      setIsNoteDialogOpen(false);
      setCurrentNote(null);
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Could not save note.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const noteRef = doc(firestore, 'notes', noteId);
      deleteDocumentNonBlocking(noteRef);
      toast({ title: 'Note deleted successfully' });
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message || "Could not delete note.",
      });
    }
  };


  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">
            My Notes
          </h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your personal notes.
          </p>
        </div>
        <Button onClick={() => handleOpenNoteDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add Note
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && notes && notes.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold text-muted-foreground">No notes yet</h3>
          <p className="text-muted-foreground mt-2">Click "Add Note" to get started.</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes?.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-4">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="ghost" size="icon" onClick={() => handleOpenNoteDialog(note)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteNote(note.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentNote?.id ? 'Edit Note' : 'Add New Note'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Note Title"
              value={currentNote?.title || ''}
              onChange={(e) => setCurrentNote({ ...currentNote!, title: e.target.value })}
              disabled={isSubmitting}
            />
            <Textarea
              placeholder="Note Content"
              className="min-h-[150px]"
              value={currentNote?.content || ''}
              onChange={(e) => setCurrentNote({ ...currentNote!, content: e.target.value })}
              disabled={isSubmitting}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSubmitting}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveNote} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

    