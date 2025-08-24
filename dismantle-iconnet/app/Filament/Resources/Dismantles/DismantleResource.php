<?php

namespace App\Filament\Resources\Dismantles;

use App\Filament\Resources\Dismantles\Pages\ManageDismantles;
use App\Models\Dismantle;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DismantleResource extends Resource
{
    protected static ?string $model = Dismantle::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Dismantle';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('PD')
                    ->required(),
                TextInput::make('nama')
                    ->required(),
                Textarea::make('alamat')
                    ->columnSpanFull(),
                TextInput::make('no_telp')
                    ->tel(),
                TextInput::make('titik_kordinat'),
                Select::make('perangkat')
                    ->options([
                        'FIBERHOME' => 'F i b e r h o m e',
                        'ZTE' => 'Z t e',
                        'RAISECOM' => 'R a i s e c o m',
                        'HUAWEI' => 'H u a w e i',
                        'AIS' => 'A i s',
                    ]),
                Select::make('status')
                    ->options([
                        'PENDING' => 'P e n d i n g',
                        'ON PROGRESS' => 'O n p r o g r e s s',
                        'SELESAI' => 'S e l e s a i',
                    ])
                    ->default('PENDING')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('Dismantle')
            ->columns([
                TextColumn::make('PD')->label('PD')
                    ->searchable(),
                TextColumn::make('nama')->label('Nama')
                    ->searchable(),
                TextColumn::make('no_telp')->label('No.Telp')
                    ->searchable(),
                TextColumn::make('titik_kordinat')->label('Kordinat')
                    ->searchable(),
                TextColumn::make('perangkat')->label('Perangkat'),
                TextColumn::make('status')->label('Status')->colors([
                    'warning' => 'PENDING',
                    'primary' => 'ON PROGRESS',
                    'success' => 'SELESAI',
                ]),
                TextColumn::make('created_at')->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')->label('Diperbarui Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageDismantles::route('/'),
        ];
    }
}