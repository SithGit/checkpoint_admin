import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentBoxComponent } from './comment-box.component';

describe('CommentBoxComponent', () => {
    let component: CommentBoxComponent;
    let fixture: ComponentFixture<CommentBoxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommentBoxComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommentBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
