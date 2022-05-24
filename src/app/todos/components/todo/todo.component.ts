import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {TodoInterface} from "src/app/types/todo.interface";
import {TodosService} from "src/app/todos/services/todos.service";

@Component({
  templateUrl: "./todo.component.html",
  selector: 'app-todos-todo'
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps: TodoInterface;
  @Input('isEditing') isEditingProps: boolean;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

  editingText: string = '';
  @ViewChild('textInput') textInput: ElementRef;

  constructor(private todosService: TodosService) {
  }

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isEditingProps.currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todoProps.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void {
    this.editingText = (event.target as HTMLInputElement).value;
  }

  changeTodo(): void {
    this.todosService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
