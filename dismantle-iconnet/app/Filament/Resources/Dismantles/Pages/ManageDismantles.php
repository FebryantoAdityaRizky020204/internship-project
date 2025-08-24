<?php

namespace App\Filament\Resources\Dismantles\Pages;

use App\Filament\Resources\Dismantles\DismantleResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;
use Filament\Actions;
use Filament\Forms;
use App\Models\Dismantle;
use Illuminate\Support\Facades\DB;

class ManageDismantles extends ManageRecords
{
    protected static string $resource = DismantleResource::class;
    protected static ?string $title = 'List Dismantle';



    protected function getHeaderActions(): array
    {
        return [
            // CreateAction::make(),

            Actions\Action::make('importCsv')
                ->label('Import CSV')
                ->form([
                    Forms\Components\FileUpload::make('file')
                        ->acceptedFileTypes(['text/csv', 'text/plain'])
                        ->required()
                        ->label('Upload CSV'),
                ])
                ->action(function (array $data) {
                    $path = storage_path('app/'.$data['file']);
                    $handle = fopen($path, 'r');
                    $header = fgetcsv($handle, 1000, ',');

                    DB::beginTransaction();
                    try {
                        while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                            $rowData = array_combine($header, $row);

                            Dismantle::create([
                                'PD' => $rowData['PD'] ?? null,
                                'nama' => $rowData['nama'] ?? null,
                                'alamat' => $rowData['alamat'] ?? null,
                                'no_telp' => $rowData['no_telp'] ?? null,
                                'titik_kordinat' => $rowData['titik_kordinat'] ?? null,
                                'perangkat' => $rowData['perangkat'] ?? null,
                                'status' => $rowData['status'] ?? 'PENDING',
                            ]);
                        }
                        DB::commit();
                        $this->notify('success', 'Data berhasil diimport.');
                    } catch (\Exception $e) {
                        DB::rollBack();
                        $this->notify('danger', 'Gagal import: '.$e->getMessage());
                    }
                }),
        ];
    }
}